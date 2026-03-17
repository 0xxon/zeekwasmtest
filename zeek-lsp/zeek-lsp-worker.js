// Zeek LSP Web Worker
// Loads the WASM LSP and handles completion/hover requests from the main thread.

import init, { Session } from './pkg/zeek_lsp_web.js';

let session = null;
let ready = false;

async function start() {
  await init();
  session = new Session();
  ready = true;
  self.postMessage({ type: 'ready' });
}

self.onmessage = function ({ data }) {
  if (!ready || !session) {
    self.postMessage({ id: data.id, result: null, error: 'LSP not ready' });
    return;
  }

  const { id, type, uri, content, line, col } = data;

  try {
    if (content !== undefined) {
      session.set_file(uri, content);
    }

    let result = null;
    if (type === 'complete') {
      result = session.complete(uri, line, col);
    } else if (type === 'hover') {
      result = session.hover(uri, line, col);
    }

    self.postMessage({ id, result });
  } catch (e) {
    self.postMessage({ id, result: null, error: String(e) });
  }
};

start().catch(err => {
  console.error('Failed to start Zeek LSP worker:', err);
  self.postMessage({ type: 'error', message: String(err) });
});
