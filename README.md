# Grain Social Portfolio Using BFF

This is web application that displays your photo galleries from
[Grain Social](https://grain.social) using the AT Protocol. This project uses
the BFF (Backend For Frontend) framework to create a lightweight, responsive
portfolio website for showcasing your Grain photos.

## Features

- Display photo galleries from your Grain Social account
- Responsive grid layout for photos
- Light and dark mode support
- Built with Preact and Tailwind CSS

## Prerequisites

- [Deno](https://deno.com/) - The JavaScript/TypeScript runtime

## Getting Started

### Development

Run the development server:

```bash
deno task dev
```

This will start both the server and the Tailwind CSS watcher in parallel.

- Server: `deno run -A --watch ./main.tsx`
- Tailwind:
  `deno run -A --node-modules-dir npm:@tailwindcss/cli -i ./input.css -o ./static/styles.css --watch`

### Code Generation

Generate lexicon types:

```bash
deno task codegen
```

## Project Structure

```
grain-portfolio/
├── __generated__/         # Generated lexicon types
├── lexicons/              # AT Protocol lexicon definitions
├── static/                # Static assets
│   └── styles.css         # Compiled Tailwind CSS
├── main.tsx               # Main application entry point
├── deno.json              # Deno configuration
└── input.css              # Tailwind CSS input file
```

## Customization

To display your own galleries, you need to modify two places in `main.tsx`:

1. Update the DID in the `backfillCollections` function:

```typescript
await backfillCollections(
  indexService,
  cfg,
)({
  repos: ["your-did-here"],
  collections: cfg.collections,
});
```

2. Modify the DID in the root route handler:

```typescript
route("/", (_req, _params, ctx) => {
  const galleries = getActorGalleries(
    "your-did-here",
    ctx
  );
  // ...
}),
```

## Technologies

- [Deno](https://deno.com/) - JavaScript/TypeScript runtime
- [BFF](https://github.com/bigmoves/bff) - Backend For Frontend framework
- [Preact](https://preactjs.com/) - Fast 3kB alternative to React
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [HTMX](https://htmx.org/) - High power tools for HTML

## License

This project is licensed under the terms found in the [LICENSE](./LICENSE) file.
