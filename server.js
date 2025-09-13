const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

let clients = new Set();

app.get("/", (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  clients.add(ip);
  res.send(`
    <h2>Client Counter Server</h2>
    <p>Your IP: ${ip}</p>
    <p>Total Clients: ${clients.size}</p>
    <ul>
      ${[...clients].map(c => `<li>${c}</li>`).join("")}
    </ul>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
