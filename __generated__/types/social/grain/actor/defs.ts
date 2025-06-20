/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from "npm:@atproto/lexicon"
import { CID } from "npm:multiformats/cid"
import { validate as _validate } from '../../../../lexicons.ts'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../util.ts'
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.ts'

const is$typed = _is$typed,
  validate = _validate
const id = 'social.grain.actor.defs'

export interface ProfileView {
  $type?: 'social.grain.actor.defs#profileView'
  did: string
  avatar?: string
  handle: string
  labels?: ComAtprotoLabelDefs.Label[]
  createdAt?: string
  description?: string
  displayName?: string
}

const hashProfileView = 'profileView'

export function isProfileView<V>(v: V) {
  return is$typed(v, id, hashProfileView)
}

export function validateProfileView<V>(v: V) {
  return validate<ProfileView & V>(v, id, hashProfileView)
}
