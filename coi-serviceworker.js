/* coi-serviceworker - https://github.com/gzuidhof/coi-serviceworker
 * Enables SharedArrayBuffer (required for Zeek WASM threading) on static hosts
 * by injecting Cross-Origin-Opener-Policy / Cross-Origin-Embedder-Policy headers
 * via a Service Worker that intercepts all fetch responses.
 */
if (typeof window === 'undefined') {
  // --- Service Worker scope ---
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) =>
    event.waitUntil(self.clients.claim())
  );

  async function handleFetch(request) {
    // Avoid "only-if-cached" requests that aren't same-origin (browser quirk).
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
      return;
    }
    const r = await fetch(request);
    if (r.status === 0) return r;
    const headers = new Headers(r.headers);
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    return new Response(r.body, {
      status: r.status,
      statusText: r.statusText,
      headers,
    });
  }

  self.addEventListener('fetch', (event) =>
    event.respondWith(handleFetch(event.request))
  );
} else {
  // --- Main thread scope: register the SW, then reload once ---
  (() => {
    if (window.crossOriginIsolated) return; // already isolated, nothing to do

    if (!navigator.serviceWorker) {
      console.warn(
        'coi-serviceworker: Service Workers not supported — ' +
        'SharedArrayBuffer may be unavailable'
      );
      return;
    }

    const src = (document.currentScript && document.currentScript.src)
      || '/coi-serviceworker.js';

    navigator.serviceWorker.register(src).then(
      () => {
        // Only reload if we haven't already reloaded due to this SW registration.
        if (!location.search.includes('coi-sw-reload')) {
          const sep = location.search ? '&' : '?';
          location.href = location.href + sep + 'coi-sw-reload=1';
        }
      },
      (e) => console.error('coi-serviceworker: failed to register', e)
    );
  })();
}
