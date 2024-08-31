const express = require('express');
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');



//New imports

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5174"
    }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
  
    //sends the message to all the users on the server
    socket.on('message', (data) => {
      socketIO.emit('messageResponse', data);
    });
  
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
  });
  app.use(cors());

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
