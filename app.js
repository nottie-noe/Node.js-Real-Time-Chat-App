const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const client = require('prom-client');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the current directory (where index.html is)
app.use(express.static(path.join(__dirname)));

// Prometheus metrics
client.collectDefaultMetrics();

const connectedUsersGauge = new client.Gauge({
  name: 'chat_connected_users',
  help: 'Number of connected users',
});

io.on('connection', (socket) => {
  connectedUsersGauge.inc();
  socket.on('disconnect', () => {
    connectedUsersGauge.dec();
  });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// ✅ Serve index.html on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
