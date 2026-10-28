#!/usr/bin/env node
// Standalone Node.js 22+ loopback transport. No keys or MongoDB packages needed.
import net from "node:net";
import { once } from "node:events";
import { pathToFileURL } from "node:url";

export function runConnector(args = process.argv.slice(2)) {
  if (args.includes("--help")) {
    console.log("Usage: node freebase-mongo-connector.mjs [--url wss://freebase.cloud/api/mongo-tunnel] [--port 17017]");
    console.log("Binds only to 127.0.0.1. Enter your API key in Compass, never here.");
    return;
  }
  if (typeof WebSocket === "undefined") throw new Error("Node.js 22 or newer is required.");
  function option(name, fallback) {
    const index = args.indexOf(name);
    if (index < 0) return fallback;
    if (!args[index + 1] || args[index + 1].startsWith("--")) throw new Error(`${name} requires a value`);
    return args[index + 1];
  }
  const endpoint = new URL(option("--url", "wss://freebase.cloud/api/mongo-tunnel"));
  if (endpoint.protocol !== "wss:" || endpoint.username || endpoint.password || endpoint.search || endpoint.hash) {
    throw new Error("Use a wss:// URL without credentials, query parameters, or fragments. TLS verification is mandatory.");
  }
  const port = Number(option("--port", "17017"));
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("Choose a port between 1024 and 65535.");
  const sessions = new Set();
  let nextId = 0;
  const server = net.createServer({ allowHalfOpen: false }, socket => {
    const id = ++nextId;
    const log = text => console.log(`[${new Date().toISOString()}] [connection ${id}] ${text}`);
    log("MongoDB client connected locally; opening encrypted tunnel.");
    socket.pause();
    socket.setNoDelay(true);
    const ws = new WebSocket(endpoint, "freebase-mongo-v1");
    ws.binaryType = "arraybuffer";
    const session = { socket, ws };
    sessions.add(session);
    let closed = false;
    const timer = setTimeout(() => close("Encrypted connection timed out."), 15_000);
    function close(reason = "Connection closed.") {
      if (closed) return;
      closed = true;
      log(reason);
      clearTimeout(timer);
      sessions.delete(session);
      socket.destroy();
      ws.close();
    }
    socket.setTimeout(10 * 60_000, () => close("Idle timeout."));
    ws.addEventListener("open", () => {
      clearTimeout(timer);
      log("Encrypted tunnel connected. Compass must still authenticate.");
      socket.resume();
    });
    socket.on("data", chunk => {
      if (ws.readyState !== WebSocket.OPEN) { close(); return; }
      ws.send(chunk);
      if (ws.bufferedAmount > 1024 * 1024) {
        socket.pause();
        const drain = setInterval(() => {
          if (closed || ws.readyState !== WebSocket.OPEN) { clearInterval(drain); close(); return; }
          if (ws.bufferedAmount < 256 * 1024) { clearInterval(drain); socket.resume(); }
        }, 10);
        drain.unref();
      }
    });
    let pending = Promise.resolve(), queuedBytes = 0;
    ws.addEventListener("message", event => {
      if (!(event.data instanceof ArrayBuffer)) { close("Unsupported tunnel frame."); return; }
      const chunk = Buffer.from(event.data);
      queuedBytes += chunk.length;
      if (queuedBytes > 8 * 1024 * 1024) { close("Response buffer limit exceeded."); return; }
      pending = pending.then(async () => {
        if (!closed && !socket.write(chunk)) await once(socket, "drain");
        queuedBytes -= chunk.length;
      }).catch(() => close("Local response forwarding failed."));
    });
    ws.addEventListener("error", () => close("Secure connection failed; check network and published tunnel."));
    ws.addEventListener("close", event => {
      if (!closed) log(`Tunnel closed (${event.code}); reconnect in Compass. No commands are retried.`);
      clearTimeout(timer);
      sessions.delete(session);
      pending.finally(() => socket.end()).catch(() => close());
    });
    socket.on("error", () => close("Local socket error."));
    socket.on("close", () => close("Local MongoDB connection closed."));
  });
  server.on("error", error => { console.error(`Cannot start connector: ${error.code}`); process.exitCode = 1; });
  server.listen(port, "127.0.0.1", () => {
    console.log(`Freebase MongoDB connector listening at 127.0.0.1:${port}`);
    console.log(`Encrypted upstream: ${endpoint.origin}${endpoint.pathname}`);
    console.log("Keep this terminal open. In Compass use PLAIN (LDAP), auth database $external, username freebase, password your API key.");
    console.log("TLS is disabled ONLY on this loopback hop; the upstream WSS connection verifies TLS.");
    console.log("No passwords, document contents, or query values are logged.");
  });
  function stop() {
    server.close();
    for (const { socket, ws } of sessions) { socket.destroy(); ws.close(); }
    process.off("SIGINT", stop); process.off("SIGTERM", stop);
  }
  process.on("SIGINT", stop); process.on("SIGTERM", stop);
  return { server, stop };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) runConnector();
