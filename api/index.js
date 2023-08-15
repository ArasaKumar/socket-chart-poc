import express from 'express';
import http from 'http'
import { Server } from 'socket.io'
import { getNodes } from './data_access.js';
const app = express();
const server = http.createServer(app);

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

const broadcastNodes = () => {
    setInterval(() => {
        getNodes().then((data) => {
            console.debug("⌚ emitting Node event", data)
            io.emit("node", data.recordset);
        }
        ).catch((err) => {
            io.emit("error", err);
        })

    }, 1000);
}

server.listen(3000, () => {
    console.log('🚀 server listening on *:3000');
});

broadcastNodes();
broadcastTime();