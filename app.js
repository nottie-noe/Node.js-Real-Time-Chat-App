const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const client = require('prom-client');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (like index.html) from current directory
app.use(express.static(path.join(__dirname)));

// Collect default Node.js metrics (CPU, memory, GC, etc.)
client.collectDefaultMetrics();

// Custom metric: track number of connected users
const connectedUsersGauge = new client.Gauge({
  name: 'chat_connected_users',
  help: 'Number of connected users',
});

// WebSocket logic for tracking connections
io.on('connection', (socket) => {
  connectedUsersGauge.inc();

  socket.on('disconnect', () => {
    connectedUsersGauge.dec();
  });
});

// Route: Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Route: Serve index.html as homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start HTTP server
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
