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
let rooms = [];
//let data = {squares: Array(9).fill(null), xIsNext: true};

io.on("connection", socket => {
    socket.room = {};
    console.log("New client connected ", socket.id);
    socket.on("disconnect", function(){
        console.log("Client disconnected ", socket.id);
    });
    socket.on("joinRoom", (newRoom) => {
        const oldRoom = socket.room.roomName;
        socket.room.roomName = newRoom;
        socket.leave(oldRoom);
        socket.join(socket.room.roomName);    
        socket.room.data = null;
        console.log(oldRoom, socket.room.roomName);
        if(socket.room.data === null){
            console.log("I'm resetting room data here")
            socket.room.data = {squares: Array(9).fill(null), isXNext:true};          
        }
        console.log(socket.room);
   
        socket.emit('newSquares', socket.room.data);
    });
    socket.on("newSquares", (clientData) => {
        squares = clientData.squares.slice();
        socket.room.data = clientData;
        console.log("newsquares", socket.room);
        socket.to(socket.room.roomName).emit('newSquares', clientData);
    });
    socket.on("reset", () =>{
        socket.to(socket.room.roomName).emit('reset');
    });
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