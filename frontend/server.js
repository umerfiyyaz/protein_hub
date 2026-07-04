const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const ROOT_DIR = __dirname; // folder where server.js lives

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);

  // Root "/" → serve html/index.html
  if (urlPath === "/") urlPath = "/html/index.html";

  const filePath = path.join(ROOT_DIR, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "text/plain";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(
        `<h2>404 – Not Found</h2><p>${urlPath}</p><a href="/">← Home</a>`,
      );
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log("");
  console.log("  ================================");
  console.log("   Protein Hub running!");
  console.log("  ================================");
  console.log(`   http://localhost:${PORT}`);
  console.log("   Press Ctrl+C to stop.");
  console.log("  ================================");
  console.log("");
});
