import { Label } from "$lexicon/types/com/atproto/label/defs.ts";
import { ProfileView } from "$lexicon/types/social/grain/actor/defs.ts";
import { Record as Profile } from "$lexicon/types/social/grain/actor/profile.ts";
import { Record as Gallery } from "$lexicon/types/social/grain/gallery.ts";
import { GalleryView } from "$lexicon/types/social/grain/gallery/defs.ts";
import { Record as GalleryItem } from "$lexicon/types/social/grain/gallery/item.ts";
import {
  isRecord as isPhoto,
  Record as Photo,
} from "$lexicon/types/social/grain/photo.ts";
import {
  isPhotoView,
  PhotoView,
} from "$lexicon/types/social/grain/photo/defs.ts";
import { $Typed, Un$Typed } from "$lexicon/util.ts";
import {
  backfillCollections,
  bff,
  BffContext,
  JETSTREAM,
  RootProps,
  route,
  WithBffMeta,
} from "@bigmoves/bff";
import { join } from "@std/path/join";
import { AtUri } from "npm:@atproto/syntax@0.4";

let staticFilesHash = new Map<string, string>();

bff({
  appName: "Grain Social Portfolio",
  // Collections marked as external are only indexed for known actors in the
  // system, in this case the did of the repo you specify below.
  externalCollections: [
    "social.grain.actor.profile",
    "social.grain.gallery",
    "social.grain.gallery.item",
    "social.grain.photo",
  ],
  jetstreamUrl: JETSTREAM.WEST_1,
  onListen: async ({ indexService, cfg }) => {
    staticFilesHash = await generateStaticFilesHash();
    await backfillCollections(
      indexService,
      cfg,
    )({
      repos: ["did:plc:bcgltzqazw5tb6k2g3ttenbj"],
      externalCollections: cfg.externalCollections,
    });
  },
  rootElement: Root,
  middlewares: [
    route("/", (_req, _params, ctx) => {
      const galleries = getActorGalleries(
        "did:plc:bcgltzqazw5tb6k2g3ttenbj",
        ctx,
      );
      return ctx.render(
        <div class="flex flex-col gap-8 my-8 px-4">
          <h1 class="text-4xl font-bold text-zinc-800 dark:text-zinc-100">
            Chad's Photos
          </h1>
          {galleries.map((g) => <PhotoGrid key={g.cid} gallery={g} />)}
        </div>,
      );
    }),
  ],
});

function Root(props: Readonly<RootProps>) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <link
          rel="stylesheet"
          href={`/static/styles.css?${staticFilesHash?.get("styles.css")}`}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body class="font-[Montserrat] max-w-3xl mx-auto dark:bg-zinc-950 dark:text-white">
        {props.children}
      </body>
    </html>
  );
}

function PhotoGrid({ gallery }: Readonly<{ gallery: GalleryView }>) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          {(gallery.record as Gallery).title}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          {(gallery.record as Gallery).description}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {gallery.items?.filter(isPhotoView).map((item) => (
          <div
            key={item.uri}
            className="aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 shadow hover:shadow-md transition-shadow"
          >
            <img
              src={item.thumb}
              alt={item.alt}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function getGalleryItemsAndPhotos(
  ctx: BffContext,
  galleries: WithBffMeta<Gallery>[],
): Map<string, WithBffMeta<Photo>[]> {
  const galleryUris = galleries.map(
    (gallery) =>
      `at://${gallery.did}/social.grain.gallery/${new AtUri(gallery.uri).rkey}`,
  );

  if (galleryUris.length === 0) return new Map();

  const { items: galleryItems } = ctx.indexService.getRecords<
    WithBffMeta<GalleryItem>
  >("social.grain.gallery.item", {
    orderBy: [{ field: "position", direction: "asc" }],
    where: [{ field: "gallery", in: galleryUris }],
  });

  const photoUris = galleryItems.map((item) => item.item).filter(Boolean);
  if (photoUris.length === 0) return new Map();

  const { items: photos } = ctx.indexService.getRecords<WithBffMeta<Photo>>(
    "social.grain.photo",
    {
      where: [{ field: "uri", in: photoUris }],
    },
  );

  const photosMap = new Map<string, WithBffMeta<Photo>>();
  for (const photo of photos) {
    photosMap.set(photo.uri, photo);
  }

  const galleryPhotosMap = new Map<string, WithBffMeta<Photo>[]>();
  for (const item of galleryItems) {
    const galleryUri = item.gallery;
    const photo = photosMap.get(item.item);

    if (!galleryPhotosMap.has(galleryUri)) {
      galleryPhotosMap.set(galleryUri, []);
    }

    if (photo) {
      galleryPhotosMap.get(galleryUri)?.push(photo);
    }
  }

  return galleryPhotosMap;
}

function getActorGalleries(handleOrDid: string, ctx: BffContext) {
  let did: string;

  if (handleOrDid.includes("did:")) {
    did = handleOrDid;
  } else {
    const actor = ctx.indexService.getActorByHandle(handleOrDid);
    if (!actor) return [];
    did = actor.did;
  }

  const { items: galleries } = ctx.indexService.getRecords<
    WithBffMeta<Gallery>
  >("social.grain.gallery", {
    where: [{ field: "did", equals: did }],
    orderBy: [{ field: "createdAt", direction: "desc" }],
  });

  const galleryPhotosMap = getGalleryItemsAndPhotos(ctx, galleries);
  const creator = getActorProfile(did, ctx);
  const labelMap = new Map<string, Label[]>();
  for (const gallery of galleries) {
    const labels = ctx.indexService.queryLabels({ subjects: [gallery.uri] });
    labelMap.set(gallery.uri, labels);
  }

  if (!creator) return [];

  return galleries.map((gallery) =>
    galleryToView(
      gallery,
      creator,
      galleryPhotosMap.get(gallery.uri) ?? [],
      labelMap.get(gallery.uri) ?? [],
    )
  );
}

export function galleryToView(
  record: WithBffMeta<Gallery>,
  creator: Un$Typed<ProfileView>,
  items: Photo[],
  labels: Label[] = [],
): Un$Typed<GalleryView> {
  return {
    uri: record.uri,
    cid: record.cid,
    creator,
    record,
    items: items
      ?.map((item) => itemToView(record.did, item))
      .filter(isPhotoView),
    labels,
    indexedAt: record.indexedAt,
  };
}

function itemToView(
  did: string,
  item:
    | WithBffMeta<Photo>
    | {
      $type: string;
    },
): Un$Typed<PhotoView> | undefined {
  if (isPhoto(item)) {
    return photoToView(did, item);
  }
  return undefined;
}

export function getActorProfile(did: string, ctx: BffContext) {
  const actor = ctx.indexService.getActor(did);
  if (!actor) return null;
  const profileRecord = ctx.indexService.getRecord<WithBffMeta<Profile>>(
    `at://${did}/social.grain.actor.profile/self`,
  );
  return profileRecord ? profileToView(profileRecord, actor.handle) : null;
}

export function profileToView(
  record: WithBffMeta<Profile>,
  handle: string,
): Un$Typed<ProfileView> {
  return {
    did: record.did,
    handle,
    displayName: record.displayName,
    description: record.description,
    avatar: photoUrl(record.did, record?.avatar?.ref.toString(), "thumbnail"),
  };
}

export function photoToView(
  did: string,
  photo: WithBffMeta<Photo>,
): $Typed<PhotoView> {
  return {
    $type: "social.grain.photo.defs#photoView",
    uri: photo.uri,
    cid: photo.photo.ref.toString(),
    thumb: photoUrl(did, photo.photo.ref.toString(), "thumbnail"),
    fullsize: photoUrl(did, photo.photo.ref.toString(), "fullsize"),
    alt: photo.alt,
    aspectRatio: photo.aspectRatio,
  };
}

export function photoUrl(
  did: string,
  cid: string,
  type: "thumbnail" | "fullsize" = "fullsize",
): string {
  return `https://cdn.bsky.app/img/feed_${type}/plain/${did}/${cid}@jpeg`;
}

async function generateStaticFilesHash(): Promise<Map<string, string>> {
  const staticFilesHash = new Map<string, string>();

  for (const entry of Deno.readDirSync(join(Deno.cwd(), "static"))) {
    if (
      entry.isFile &&
      (entry.name.endsWith(".js") || entry.name.endsWith(".css"))
    ) {
      const fileContent = await Deno.readFile(
        join(Deno.cwd(), "static", entry.name),
      );
      const hashBuffer = await crypto.subtle.digest("SHA-256", fileContent);
      const hash = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      staticFilesHash.set(entry.name, hash);
    }
  }

  return staticFilesHash;
}
