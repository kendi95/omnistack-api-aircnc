const express = require("express");
const socket = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const api = express();
const server = http.Server(api);
const io = socket(server);

const connectedUsers = {};

const routes = require("./routes");

mongoose.connect("mongodb+srv://omnistack:omnistack@api-aircnc-ycawd.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

api.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

api.use(cors())
api.use(express.json());
api.use("/files", express.static(path.resolve(__dirname, '..', 'uploads')));
api.use(routes);

server.listen(3030, () => {
    console.log("Server is running...");
});