import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";

const port = Number.parseInt(process.env.PORT ?? "10000", 10);
const distDir = join(process.cwd(), "src", "frontend", "dist");

if (!existsSync(distDir)) {
  console.error(
    `Build output not found at ${distDir}. Run "pnpm build:frontend" before starting the server.`,
  );
  process.exit(1);
}

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function sendFile(res, filePath) {
  const ext = extname(filePath);
  res.writeHead(200, {
    "Content-Type": mimeTypes[ext] ?? "application/octet-stream",
    "Cache-Control":
      ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
  });
  createReadStream(filePath).pipe(res);
}

createServer((req, res) => {
  const requestPath = req.url?.split("?")[0] ?? "/";
  const safePath = normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const targetPath = join(
    distDir,
    safePath === "/" ? "index.html" : safePath.replace(/^[/\\]+/, ""),
  );

  if (existsSync(targetPath) && statSync(targetPath).isFile()) {
    sendFile(res, targetPath);
    return;
  }

  sendFile(res, join(distDir, "index.html"));
}).listen(port, "0.0.0.0", () => {
  console.log(`Render server listening on ${port}`);
});
