const http = require("http");
const RED = require("node-red");

// Cấu hình cơ bản
const settings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/",
  uiPort: process.env.PORT || 1880,
  functionGlobalContext: {}
};

// Tạo server HTTP
const server = http.createServer();

// Khởi động Node-RED
RED.init(server, settings);

// Routes
server.on('request', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});

// Start
server.listen(settings.uiPort, () => {
  console.log("Node-RED running on port", settings.uiPort);
});

RED.start();
