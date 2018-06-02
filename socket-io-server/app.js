const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

let interval;


io.on("connection", socket => {
    const room = null;
    console.log("New client connected ", socket.id);
    socket.on("disconnect", function(){
        console.log("Client disconnected ", socket.id);
    });
    socket.on("joinRoom", (room) => {
        socket.room = room;
        socket.join(room);       
        socket.to(room).emit('justJoined', console.log("Just joined ", socket.room));
    })
    socket.on("newSquares", (squares) => {
        socket.to(socket.room).emit('newSquares', squares);
    })
});

const getApiAndEmit = async socket => {
    try {
        const res = await axios.get(
            "https://api.darksky.net/forecast/446b03f2a015f83f962d3360e6e1ce7f/43.7695,11.2558"
        );
        socket.emit("FromAPI", res.data.currently.temperature);
        console.log(res.data.currently.temperature, 'hello');
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

server.listen(port, () => console.log(`Listening on port ${port}`));