#!/usr/bin/env python3
"""Serve with COOP/COEP headers. Usage: python3 serve.py [port]"""
import http.server, sys

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        super().end_headers()

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
print(f"Serving at http://localhost:{port}")
http.server.HTTPServer(("", port), Handler).serve_forever()
