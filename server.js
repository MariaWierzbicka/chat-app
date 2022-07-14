const express = require('express');
const path = require('path');
const socket = require('socket.io');
const app = express();
app.use(express.static(path.join(__dirname, '/client')));

let messages = [];
let users = [];

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});

const io = socket(server);

app.get('/', (req, res) => {
  res.render('client/index');
});

io.on('connection', (socket) => {

  socket.on('login', (name) => {
    const user = {name, id: socket.id};
    users.push(user);
    socket.broadcast.emit('botMessageJoined', name);
  });

  socket.on('message', (message) => { 
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', (name) => {
    const leavingUser = users.find(user => user.id === socket.id);
    const userIndex = users.indexOf(leavingUser);
    users.splice(userIndex, 1);
    if(users.length < 1){
      messages = []
    } else {
      socket.broadcast.emit('botMessageLeft', leavingUser.name);
    }
  });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});
