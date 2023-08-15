const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080"
    }
});

app.get('/', (req, res) => {
    res.send("Hello")
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

const broadcastTime = ()=>{
    setInterval(() => {
        const data = new Date().toISOString();
        console.debug("⌚ emitting time event", data)
        io.emit("time", data);
    }, 1000);
}

server.listen(3000, () => {
    console.log('🚀 server listening on *:3000');
});

broadcastTime();