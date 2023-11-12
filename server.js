import {
  serveDir,
  serveFile,
} from "https://deno.land/std@0.202.0/http/file_server.ts";

Deno.serve((req) => {
  const pathname = new URL(req.url).pathname;

  if (pathname.startsWith("/js/") || pathname.startsWith("/deps/")) {
    return serveDir(req);
  }

  if (pathname === "/") {
    return serveFile(req, "./index.html");
  }

  if (pathname.startsWith("/notes")) {
    return serveDir(req, {
      fsRoot: "notes",
      urlRoot: "notes",
    });
  }

  return new Response("404: Not Found", {
    status: 404,
  });
});
