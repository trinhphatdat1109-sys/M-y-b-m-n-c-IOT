const express = require("express");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

const app = express();
app.use(cors());

let clients = new Map(); // key: ip, value: {count, status, lastSeen}

app.get("/", (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = new Date().toLocaleString();

  if (!clients.has(ip)) {
    clients.set(ip, { count: 1, status: "online", lastSeen: now });
  } else {
    let c = clients.get(ip);
    c.count++;
    c.status = "online";
    c.lastSeen = now;
    clients.set(ip, c);
  }

  broadcastClients();

  res.send(`
    <h2>Client Counter Server</h2>
    <p>Your IP: ${ip}</p>
    <p>Total Clients: ${clients.size}</p>
    <ul>
      ${[...clients.entries()].map(([ip, data]) =>
        `<li>${ip} - ${data.status} - count: ${data.count}</li>`).join("")}
    </ul>
  `);
});

// HTTP + WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function broadcastClients() {
  const data = JSON.stringify([...clients.entries()].map(([ip, d]) => ({ ip, ...d })));
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

wss.on("connection", (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`New WS client: ${ip}`);
  ws.send(JSON.stringify([...clients.entries()].map(([ip, d]) => ({ ip, ...d }))));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
