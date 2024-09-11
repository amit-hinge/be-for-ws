const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
// const server = require('http').createServer();
// server.listen(8080, '127.0.0.1');


// Add this middleware to set the CSP header
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' ws://localhost:8080");
  return next();
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send('Welcome to the WebSocket server!');
  
  ws.on('message', (message) => {
    console.log('Received:', message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080, host: '127.0.0.1' });

// wss.on('connection', (ws) => {
//   console.log('Client connected');
//   ws.on('message', (message) => {
//     console.log('Received:', message);
//   });
//   ws.send('Hello Client!');
// });

// console.log('WebSocket server is running on ws://127.0.0.1:8080');
