const http = require('http');       // snippet= req
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();        // importing all the functions of express into const app
const port = 4500 || process.env.PORT;


app.use(cors());        // used for inter communication b/w URL
app.get("/",(req,res)=>{
    res.send("Hello it's working!!!")
})

const server = http.createServer(app);    // creating server and calling express(using app variable)

const io = socketIO(server);  // establishing the connection with the server

io.on("connection", ()=>{       // when the ckt gets on 
    console.log('New Connection');
})
server.listen(port, () => {
    console.log(`server is working on http://localhost: ${port}`);
})