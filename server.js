const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.use(express.static("."));

const players = {};

io.on("connection", (socket) => {
    players[socket.id] = { x: 100, y: 100 };

    io.emit("online", Object.keys(players).length);
    socket.emit("init", players);
    socket.broadcast.emit("newPlayer", { id: socket.id, x: 100, y: 100 });

    socket.on("move", (pos) => {
        players[socket.id] = pos;
        socket.broadcast.emit("update", { id: socket.id, ...pos });
    });

    

    socket.on("disconnect", () => {
        delete players[socket.id];
        io.emit("remove", socket.id);
        io.emit("online", Object.keys(players).length);
    });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
