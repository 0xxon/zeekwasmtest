/* tslint:disable */
/* eslint-disable */
/**
 * An LSP analysis session backed by an in-memory Zeek database.
 */
export class Session {
  free(): void;
  /**
   * Create a new session pre-loaded with the bundled Zeek stdlib.
   */
  constructor();
  /**
   * Compute hover information at a position. Returns JSON (LSP Hover) or null.
   */
  hover(uri: string, line: number, col: number): any;
  /**
   * Compute completions at a position. Returns JSON (LSP CompletionList) or null.
   */
  complete(uri: string, line: number, col: number): any;
  /**
   * Add or replace file content in the session.
   */
  set_file(uri: string, content: string): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __assert_fail: (a: number, b: number, c: number, d: number) => void;
  readonly __wbg_session_free: (a: number, b: number) => void;
  readonly abort: () => void;
  readonly calloc: (a: number, b: number) => number;
  readonly fclose: (a: number) => number;
  readonly fdopen: (a: number, b: number) => number;
  readonly fprintf: (a: number, b: number, c: number) => number;
  readonly fputc: (a: number, b: number) => number;
  readonly free: (a: number) => void;
  readonly fwrite: (a: number, b: number, c: number, d: number) => number;
  readonly iswalnum: (a: number) => number;
  readonly iswspace: (a: number) => number;
  readonly malloc: (a: number) => number;
  readonly now: () => number;
  readonly realloc: (a: number, b: number) => number;
  readonly session_complete: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly session_hover: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly session_new: () => number;
  readonly session_set_file: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly snprintf: (a: number, b: number, c: number, d: number) => number;
  readonly strncmp: (a: number, b: number, c: number) => number;
  readonly vsnprintf: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_0: (a: number, b: number) => number;
  readonly __wbindgen_export_1: (a: number, b: number, c: number, d: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
