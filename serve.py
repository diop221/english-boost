# Serveur de développement : comme `python3 -m http.server`, mais interdit le cache
# du navigateur pour que chaque modification soit visible au rechargement.
import http.server, functools

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

if __name__ == '__main__':
    http.server.test(HandlerClass=NoCacheHandler, port=5173, bind='127.0.0.1')
