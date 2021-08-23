// Getting required modules
const http = require('http');
const express = require('express');
const cors = require('cors');
const sockerIO = require('socket.io');
const { Socket } = require('net');
const port = 5000;

// Intializing modules
const app = express();
const server = http.createServer(app);
const io = sockerIO(server);

const users = [{}];

// sending request/ response to app
app.use(cors());
app.get('/', (req, res) => {
    res.send('vingesh');
})

// starting socket connection 
io.on("connection", (socket) => {
    console.log('New Connection');
    socket.on('joined', ({user}) => {
        users[socket.id] = user;
        console.log(`${user} joined`);
        socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]} `})
        socket.broadcast.emit('userJoined', {user:"Admin", message:`${users[socket.id]} has joined the chat`})
    })

    socket.on('message', ({message,id}) => {
        io.emit('sendMessage', {user:users[id],message,id})
    })
    socket.on('disconnect', (data) => {
        socket.broadcast.emit('leave', {user: "Admin", message: `${users[socket.id]} left the chat`});
        console.log(data.user, ' disconnected');
    })
});

// starting the server
server.listen(port, () => {
    console.log(`server working on http://localhost:${port}`);
})