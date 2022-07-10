const http = require('http');       // snippet= req
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();        // importing all the functions of express into const app
const port = 4500 || process.env.PORT;

const users = [{}]        // array of obj

app.use(cors());        // used for inter communication b/w URL
app.get("/", (req, res) => {
    res.send("Hello it's working!!!")
})

const server = http.createServer(app);    // creating server and calling express(using app variable)

const io = socketIO(server);  // establishing the connection with the server. io is the entire ckt

io.on("connection", (socket) => {       // when the ckt gets on 
    console.log('New Connection');

    socket.on('joined', ({ user }) => {        // sockets are individual users, destructuring data.user 
        users[socket.id] = user;       // every socket has a unique id
        // console.log(`${user} has joined`);
        socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined` })      // broadcast means, the the msg will go to all members except the  joiny
        socket.emit('welcome', { user: "Admin", message: `${users[socket.id]} Welcome to the chat` })
    })

    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message, id })     // to circulate the message into the entire circuit, thus we use io, not socket, users[id] will give the name of the user
    })

    socket.on('disconnected', () => {        // when the user leaves the chats
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left the chats` });
        console.log(`${users[socket.id]} left`);
    });
})


server.listen(port, () => {
    console.log(`server is working on http://localhost: ${port}`);
})