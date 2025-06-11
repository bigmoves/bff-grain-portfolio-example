/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  type LexiconDoc,
  Lexicons,
  ValidationError,
  type ValidationResult,
} from "npm:@atproto/lexicon"
import { type $Typed, is$typed, maybe$typed } from './util.ts'

export const schemaDict = {
  SocialGrainDefs: {
    lexicon: 1,
    id: 'social.grain.defs',
    defs: {
      aspectRatio: {
        type: 'object',
        required: ['width', 'height'],
        properties: {
          width: {
            type: 'integer',
            minimum: 1,
          },
          height: {
            type: 'integer',
            minimum: 1,
          },
        },
        description:
          'width:height represents an aspect ratio. It may be approximate, and may not correspond to absolute dimensions in any given unit.',
      },
    },
  },
  SocialGrainGalleryItem: {
    lexicon: 1,
    id: 'social.grain.gallery.item',
    defs: {
      main: {
        key: 'tid',
        type: 'record',
        record: {
          type: 'object',
          required: ['createdAt', 'gallery', 'item'],
          properties: {
            item: {
              type: 'string',
              format: 'at-uri',
            },
            gallery: {
              type: 'string',
              format: 'at-uri',
            },
            position: {
              type: 'integer',
              default: 0,
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  SocialGrainGalleryDefs: {
    lexicon: 1,
    id: 'social.grain.gallery.defs',
    defs: {
      galleryView: {
        type: 'object',
        required: ['uri', 'cid', 'creator', 'record', 'indexedAt'],
        properties: {
          cid: {
            type: 'string',
            format: 'cid',
          },
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          items: {
            type: 'array',
            items: {
              refs: ['lex:social.grain.photo.defs#photoView'],
              type: 'union',
            },
          },
          labels: {
            type: 'array',
            items: {
              ref: 'lex:com.atproto.label.defs#label',
              type: 'ref',
            },
          },
          record: {
            type: 'unknown',
          },
          creator: {
            ref: 'lex:social.grain.actor.defs#profileView',
            type: 'ref',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
    },
  },
  SocialGrainGallery: {
    lexicon: 1,
    id: 'social.grain.gallery',
    defs: {
      main: {
        key: 'tid',
        type: 'record',
        record: {
          type: 'object',
          required: ['title', 'createdAt'],
          properties: {
            title: {
              type: 'string',
              maxLength: 100,
            },
            labels: {
              refs: ['lex:com.atproto.label.defs#selfLabels'],
              type: 'union',
              description:
                'Self-label values for this post. Effectively content warnings.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            description: {
              type: 'string',
              maxLength: 1000,
            },
          },
        },
      },
    },
  },
  SocialGrainActorDefs: {
    lexicon: 1,
    id: 'social.grain.actor.defs',
    defs: {
      profileView: {
        type: 'object',
        required: ['did', 'handle'],
        properties: {
          did: {
            type: 'string',
            format: 'did',
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          handle: {
            type: 'string',
            format: 'handle',
          },
          labels: {
            type: 'array',
            items: {
              ref: 'lex:com.atproto.label.defs#label',
              type: 'ref',
            },
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
          description: {
            type: 'string',
            maxLength: 2560,
            maxGraphemes: 256,
          },
          displayName: {
            type: 'string',
            maxLength: 640,
            maxGraphemes: 64,
          },
        },
      },
    },
  },
  SocialGrainActorProfile: {
    lexicon: 1,
    id: 'social.grain.actor.profile',
    defs: {
      main: {
        key: 'literal:self',
        type: 'record',
        record: {
          type: 'object',
          properties: {
            avatar: {
              type: 'blob',
              accept: ['image/png', 'image/jpeg'],
              maxSize: 1000000,
              description:
                "Small image to be displayed next to posts from account. AKA, 'profile picture'",
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            description: {
              type: 'string',
              maxLength: 2560,
              description: 'Free-form profile description text.',
              maxGraphemes: 256,
            },
            displayName: {
              type: 'string',
              maxLength: 640,
              maxGraphemes: 64,
            },
          },
        },
        description: 'A declaration of a basic account profile.',
      },
    },
  },
  SocialGrainPhotoDefs: {
    lexicon: 1,
    id: 'social.grain.photo.defs',
    defs: {
      photoView: {
        type: 'object',
        required: ['uri', 'cid', 'thumb', 'fullsize', 'alt'],
        properties: {
          alt: {
            type: 'string',
            description:
              'Alt text description of the image, for accessibility.',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          thumb: {
            type: 'string',
            format: 'uri',
            description:
              'Fully-qualified URL where a thumbnail of the image can be fetched. For example, CDN location provided by the App View.',
          },
          fullsize: {
            type: 'string',
            format: 'uri',
            description:
              'Fully-qualified URL where a large version of the image can be fetched. May or may not be the exact original blob. For example, CDN location provided by the App View.',
          },
          aspectRatio: {
            ref: 'lex:social.grain.defs#aspectRatio',
            type: 'ref',
          },
        },
      },
    },
  },
  SocialGrainPhoto: {
    lexicon: 1,
    id: 'social.grain.photo',
    defs: {
      main: {
        key: 'tid',
        type: 'record',
        record: {
          type: 'object',
          required: ['photo', 'alt'],
          properties: {
            alt: {
              type: 'string',
              description:
                'Alt text description of the image, for accessibility.',
            },
            photo: {
              type: 'blob',
              accept: ['image/*'],
              maxSize: 1000000,
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            aspectRatio: {
              ref: 'lex:social.grain.defs#aspectRatio',
              type: 'ref',
            },
          },
        },
      },
    },
  },
  ComAtprotoLabelDefs: {
    lexicon: 1,
    id: 'com.atproto.label.defs',
    defs: {
      label: {
        type: 'object',
        required: ['src', 'uri', 'val', 'cts'],
        properties: {
          cid: {
            type: 'string',
            format: 'cid',
            description:
              "Optionally, CID specifying the specific version of 'uri' resource this label applies to.",
          },
          cts: {
            type: 'string',
            format: 'datetime',
            description: 'Timestamp when this label was created.',
          },
          exp: {
            type: 'string',
            format: 'datetime',
            description:
              'Timestamp at which this label expires (no longer applies).',
          },
          neg: {
            type: 'boolean',
            description:
              'If true, this is a negation label, overwriting a previous label.',
          },
          sig: {
            type: 'bytes',
            description: 'Signature of dag-cbor encoded label.',
          },
          src: {
            type: 'string',
            format: 'did',
            description: 'DID of the actor who created this label.',
          },
          uri: {
            type: 'string',
            format: 'uri',
            description:
              'AT URI of the record, repository (account), or other resource that this label applies to.',
          },
          val: {
            type: 'string',
            maxLength: 128,
            description:
              'The short string name of the value or type of this label.',
          },
          ver: {
            type: 'integer',
            description: 'The AT Protocol version of the label object.',
          },
        },
        description:
          'Metadata tag on an atproto resource (eg, repo or record).',
      },
      selfLabel: {
        type: 'object',
        required: ['val'],
        properties: {
          val: {
            type: 'string',
            maxLength: 128,
            description:
              'The short string name of the value or type of this label.',
          },
        },
        description:
          'Metadata tag on an atproto record, published by the author within the record. Note that schemas should use #selfLabels, not #selfLabel.',
      },
      labelValue: {
        type: 'string',
        knownValues: [
          '!hide',
          '!no-promote',
          '!warn',
          '!no-unauthenticated',
          'dmca-violation',
          'doxxing',
          'porn',
          'sexual',
          'nudity',
          'nsfl',
          'gore',
        ],
      },
      selfLabels: {
        type: 'object',
        required: ['values'],
        properties: {
          values: {
            type: 'array',
            items: {
              ref: 'lex:com.atproto.label.defs#selfLabel',
              type: 'ref',
            },
            maxLength: 10,
          },
        },
        description:
          'Metadata tags on an atproto record, published by the author within the record.',
      },
      labelValueDefinition: {
        type: 'object',
        required: ['identifier', 'severity', 'blurs', 'locales'],
        properties: {
          blurs: {
            type: 'string',
            description:
              "What should this label hide in the UI, if applied? 'content' hides all of the target; 'media' hides the images/video/audio; 'none' hides nothing.",
            knownValues: ['content', 'media', 'none'],
          },
          locales: {
            type: 'array',
            items: {
              ref: 'lex:com.atproto.label.defs#labelValueDefinitionStrings',
              type: 'ref',
            },
          },
          severity: {
            type: 'string',
            description:
              "How should a client visually convey this label? 'inform' means neutral and informational; 'alert' means negative and warning; 'none' means show nothing.",
            knownValues: ['inform', 'alert', 'none'],
          },
          adultOnly: {
            type: 'boolean',
            description:
              'Does the user need to have adult content enabled in order to configure this label?',
          },
          identifier: {
            type: 'string',
            maxLength: 100,
            description:
              "The value of the label being defined. Must only include lowercase ascii and the '-' character ([a-z-]+).",
            maxGraphemes: 100,
          },
          defaultSetting: {
            type: 'string',
            default: 'warn',
            description: 'The default setting for this label.',
            knownValues: ['ignore', 'warn', 'hide'],
          },
        },
        description:
          'Declares a label value and its expected interpretations and behaviors.',
      },
      labelValueDefinitionStrings: {
        type: 'object',
        required: ['lang', 'name', 'description'],
        properties: {
          lang: {
            type: 'string',
            format: 'language',
            description:
              'The code of the language these strings are written in.',
          },
          name: {
            type: 'string',
            maxLength: 640,
            description: 'A short human-readable name for the label.',
            maxGraphemes: 64,
          },
          description: {
            type: 'string',
            maxLength: 100000,
            description:
              'A longer description of what the label means and why it might be applied.',
            maxGraphemes: 10000,
          },
        },
        description:
          'Strings which describe the label in the UI, localized into a specific language.',
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>
export const schemas = Object.values(schemaDict) satisfies LexiconDoc[]
export const lexicons: Lexicons = new Lexicons(schemas)

export function validate<T extends { $type: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType: true,
): ValidationResult<T>
export function validate<T extends { $type?: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: false,
): ValidationResult<T>
export function validate(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: boolean,
): ValidationResult {
  return (requiredType ? is$typed : maybe$typed)(v, id, hash)
    ? lexicons.validate(`${id}#${hash}`, v)
    : {
        success: false,
        error: new ValidationError(
          `Must be an object with "${hash === 'main' ? id : `${id}#${hash}`}" $type property`,
        ),
      }
}

export const ids = {
  SocialGrainDefs: 'social.grain.defs',
  SocialGrainGalleryItem: 'social.grain.gallery.item',
  SocialGrainGalleryDefs: 'social.grain.gallery.defs',
  SocialGrainGallery: 'social.grain.gallery',
  SocialGrainActorDefs: 'social.grain.actor.defs',
  SocialGrainActorProfile: 'social.grain.actor.profile',
  SocialGrainPhotoDefs: 'social.grain.photo.defs',
  SocialGrainPhoto: 'social.grain.photo',
  ComAtprotoLabelDefs: 'com.atproto.label.defs',
} as const
