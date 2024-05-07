const express = require("express");
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use("/public", express.static(path.join(__dirname, "/public")));

const serverPort = "3000";
const serverAdress = "127.0.0.1";

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/public/html/index.html");
});

io.on('connection', (socket)=>{
    
});

httpServer.listen(serverPort, serverAdress, ()=>{
    console.log("Server is running...");
});