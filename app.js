const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const client = require('prom-client'); // Prometheus client

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Prometheus metrics setup
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const socketConnectionCounter = new client.Counter({
  name: 'socket_connections_total',
  help: 'Total number of socket.io connections',
});
register.registerMetric(socketConnectionCounter);

io.on('connection', socket => {
  console.log('User connected');
  socketConnectionCounter.inc();

  socket.on('disconnect', () => console.log('User disconnected'));
});

// Serve static files
app.use(express.static(__dirname));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

server.listen(3000, () => console.log('Chat app running on port 3000'));
