const express = require('express');
const app = express();
const path = require('path');
const SocketIO = require('socket.io');

const history = [];

// Settings
app.set('port', process.env.PORT || 3000);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server Start
const server = app.listen(app.get('port'), () => {
  console.log(`🚀 Server ready at port: ${app.get('port')}`);
});

// WebSockets
const io = SocketIO(server);

io.on('connection', (socket) => {
  console.log(`🔌 New Connection ${socket.id}`);

  socket.on('chat:message', (data) => {
    data = { ...data, send: new Date().getTime() };
    history.push(data);
    io.emit('chat:message', data);
  });

  socket.emit('chat:history', history);
});
