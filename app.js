const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve index.html and other static files from current folder
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', socket => {
  console.log('User connected');
  socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(3000, () => console.log('Chat app running on port 3000'));
