const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const client = require('prom-client');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Enable collection of default metrics (CPU, memory, etc.)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Custom metric: number of connected users
const connectedUsersGauge = new client.Gauge({
  name: 'chat_connected_users',
  help: 'Number of connected users',
});

// WebSocket logic
io.on('connection', (socket) => {
  connectedUsersGauge.inc();

  socket.on('disconnect', () => {
    connectedUsersGauge.dec();
  });
});

// Route to expose Prometheus metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Default homepage route
app.get('/', (req, res) => {
  res.send('Chat server is up and running!');
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
