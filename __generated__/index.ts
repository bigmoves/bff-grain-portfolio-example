/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  createServer as createXrpcServer,
  Server as XrpcServer,
  type Options as XrpcOptions,
  type AuthVerifier,
  type StreamAuthVerifier,
} from "npm:@atproto/xrpc-server"
import { schemas } from './lexicons.ts'

export function createServer(options?: XrpcOptions): Server {
  return new Server(options)
}

export class Server {
  xrpc: XrpcServer
  social: SocialNS

  constructor(options?: XrpcOptions) {
    this.xrpc = createXrpcServer(schemas, options)
    this.social = new SocialNS(this)
  }
}

export class SocialNS {
  _server: Server
  grain: SocialGrainNS

  constructor(server: Server) {
    this._server = server
    this.grain = new SocialGrainNS(server)
  }
}

export class SocialGrainNS {
  _server: Server
  gallery: SocialGrainGalleryNS
  actor: SocialGrainActorNS

  constructor(server: Server) {
    this._server = server
    this.gallery = new SocialGrainGalleryNS(server)
    this.actor = new SocialGrainActorNS(server)
  }
}

export class SocialGrainGalleryNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }
}

export class SocialGrainActorNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }
}

type SharedRateLimitOpts<T> = {
  name: string
  calcKey?: (ctx: T) => string | null
  calcPoints?: (ctx: T) => number
}
type RouteRateLimitOpts<T> = {
  durationMs: number
  points: number
  calcKey?: (ctx: T) => string | null
  calcPoints?: (ctx: T) => number
}
type HandlerOpts = { blobLimit?: number }
type HandlerRateLimitOpts<T> = SharedRateLimitOpts<T> | RouteRateLimitOpts<T>
type ConfigOf<Auth, Handler, ReqCtx> =
  | Handler
  | {
      auth?: Auth
      opts?: HandlerOpts
      rateLimit?: HandlerRateLimitOpts<ReqCtx> | HandlerRateLimitOpts<ReqCtx>[]
      handler: Handler
    }
type ExtractAuth<AV extends AuthVerifier | StreamAuthVerifier> = Extract<
  Awaited<ReturnType<AV>>,
  { credentials: unknown }
>
