import http.server, socketserver, os, json, webbrowser
PORT = 8000
BASE = os.path.dirname(os.path.abspath(__file__)); os.chdir(BASE)
HF = os.path.join(BASE, "history.json")
def load():
    try:
        with open(HF, encoding="utf-8") as f: return json.load(f)
    except Exception: return []
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store"); super().end_headers()
    def _json(self, obj, code=200):
        b = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(code); self.send_header("Content-Type", "application/json"); self.send_header("Content-Length", str(len(b))); self.end_headers(); self.wfile.write(b)
    def do_GET(self):
        if self.path == "/api/history": return self._json(load())
        return super().do_GET()
    def do_POST(self):
        if self.path != "/api/history": return self._json({"error": "not found"}, 404)
        n = int(self.headers.get("Content-Length", 0))
        try: a = json.loads(self.rfile.read(n))
        except Exception: return self._json({"error": "bad json"}, 400)
        h = load(); h.append(a)
        tmp = HF + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f: json.dump(h, f, ensure_ascii=False)
        os.replace(tmp, HF); self._json({"ok": True, "count": len(h)})
    def do_DELETE(self):
        if self.path == "/api/history":
            if os.path.exists(HF): os.remove(HF)
            return self._json({"ok": True})
with socketserver.TCPServer(("127.0.0.1", PORT), H) as s:
    print(f"CCFA Study Hub em http://localhost:{PORT}  (Ctrl+C para sair)")
    print(f"Histórico salvo em: {HF}")
    webbrowser.open(f"http://localhost:{PORT}")
    s.serve_forever()
