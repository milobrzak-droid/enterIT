#!/usr/bin/env python3
"""Serve the static site locally with the same canonical locale routes as production."""

from __future__ import annotations

import argparse
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit


PROJECT_ROOT = Path(__file__).resolve().parents[1]
LOCALE_REDIRECTS = {
    "/en": "/en.html",
    "/en/": "/en.html",
    "/en/index.html": "/en.html",
    "/de": "/de.html",
    "/de/": "/de.html",
    "/de/index.html": "/de.html",
    "/pl": "/pl.html",
    "/pl/": "/pl.html",
    "/pl/index.html": "/pl.html",
}


class EnterITRequestHandler(SimpleHTTPRequestHandler):
    def _redirect_locale(self) -> bool:
        request_url = urlsplit(self.path)
        destination = LOCALE_REDIRECTS.get(request_url.path)
        if destination is None:
            return False

        if request_url.query:
            destination = f"{destination}?{request_url.query}"

        self.send_response(302)
        self.send_header("Location", destination)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", "0")
        self.end_headers()
        return True

    def do_GET(self) -> None:  # noqa: N802 - stdlib handler API
        if not self._redirect_locale():
            super().do_GET()

    def do_HEAD(self) -> None:  # noqa: N802 - stdlib handler API
        if not self._redirect_locale():
            super().do_HEAD()

    def list_directory(self, path: str):
        self.send_error(404, "File not found")
        return None


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve enterIT locally")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()

    os.chdir(PROJECT_ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", args.port), EnterITRequestHandler)
    print(f"enterIT is running at http://localhost:{args.port}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
