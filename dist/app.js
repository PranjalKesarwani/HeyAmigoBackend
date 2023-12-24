"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/server");
const PORT = process.env.PORT || 5000;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const grpChatRoutes_1 = __importDefault(require("./routes/grpChatRoutes"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const cloudinary_1 = require("cloudinary");
const node_http_1 = require("node:http");
const userModel_1 = __importDefault(require("./models/userModel"));
const app = (0, express_1.default)();
// const origin = 'http://127.0.0.1:5173';
// const origin = "https://heyamigo.netlify.app";
const origin = "https://heyamigov2.netlify.app";
app.use((0, cors_1.default)({
    origin: origin,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Origin', 'Accept', 'X-Requested-With', 'Content-Type', 'Authorization'],
    preflightContinue: true,
    optionsSuccessStatus: 204
}));
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: origin
    }
});
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', async (req, res) => {
    const doc = await userModel_1.default.find({ username: 'e' });
    res.json(doc);
});
app.use("/api/auth", userRoutes_1.default);
app.use("/api/message-routes", messageRoutes_1.default);
app.use("/api/chat-routes", chatRoutes_1.default);
app.use("/api/grpcontact-routes", grpChatRoutes_1.default);
// types------------------------------------
const emailToSocketIdMap = new Map();
const socketIdToemailMap = new Map();
const emailToSocketIdMapI = new Map();
const socketIdToemailMapI = new Map();
io.on('connection', async (socket) => {
    console.log(`Socket ${socket.id} connected`);
    //Creating room using userId
    socket.on('createUserRoom', (userInfo) => {
        socket.join(userInfo.userId); //isse room create hota hai  and agar existing room me jana hai toh io.to()
        socket.emit('createdUserRoom');
    });
    socket.on('sentMsgInUserRoom', (data) => {
        if (!data.usersArray) {
            return console.log('Error in users array');
        }
        data.usersArray.forEach((element) => {
            if (data.userId === element._id)
                return;
            socket.in(element._id).emit('receivedMsg', { chatId: data.chatId, msgId: data.msgId, });
        });
    });
    socket.on('sentMsgInUserRoomForG', (data) => {
        if (!data.usersArray) {
            return console.log('Error in users array');
        }
        data.usersArray.forEach((element) => {
            if (data.userId === element._id)
                return;
            socket.in(element._id).emit('receivedMsgForG', { chatId: data.chatId, msgId: data.msgId });
        });
    });
    //socket for video call feature demo begins
    socket.on('room:join', (data) => {
        const { email, room } = data;
        console.log(email, room);
        // emailToSocketIdMap.set(email,socket.id);
        // socketIdToemailMap.set(socket.id,email);
        //if the room already exist at global level, then the incoming user will join the room so only then this socket will work and if the room does not exist then only socket.join will create a room using that roomId
        io.to(room).emit('user:joined', { email, id: socket.id }); //if new user comes in existing room then we will join hi then push in the room
        socket.join(room);
        io.to(socket.id).emit("room:join", data); //Here both users will emit this event to them informing that they had joined the room
    });
    socket.on('user:call', ({ to, offer }) => {
        io.to(to).emit('incoming:call', { from: socket.id, offer });
    });
    socket.on('call:accepted', ({ to, ans }) => {
        io.to(to).emit("call:accepted", { from: socket.id, ans });
    });
    socket.on('peer:nego:needed', ({ to, offer }) => {
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });
    socket.on("peer:nego:done", ({ to, ans }) => {
        io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
    //socket for video call feature demo ends
    //socket for video call feature implementation begins
    socket.on('room:joinI', (data) => {
        const { roomId } = data;
        console.log(roomId);
        // emailToSocketIdMapI.set(email,socket.id);
        // socketIdToemailMapI.set(socket.id,email);
        //if the room already exist at global level, then the incoming user will join the room so only then this socket will work and if the room does not exist then only socket.join will create a room using that roomId
        io.to(roomId).emit('user:joinedI', { id: socket.id }); //if new user comes in existing room then we will join hi then push in the room
        socket.join(roomId);
        io.to(socket.id).emit("room:joinI", { roomId, msg: 'Socket connected!' }); //Here both users will emit this event to them informing that they had joined the room
    });
    socket.on('user:callI', ({ to, offer }) => {
        console.log('---', offer);
        io.to(to).emit('incoming:callI', { from: socket.id, offer });
    });
    socket.on('call:acceptedI', ({ to, ans }) => {
        io.to(to).emit("call:acceptedI", { from: socket.id, ans });
    });
    socket.on('peer:nego:neededI', ({ to, offer }) => {
        io.to(to).emit("peer:nego:neededI", { from: socket.id, offer });
    });
    socket.on("peer:nego:doneI", ({ to, ans }) => {
        io.to(to).emit("peer:nego:finalI", { from: socket.id, ans });
    });
    socket.on('hanged', ({ to }) => {
        io.to(to).emit('hang:call', { msg: 'call hanged' });
    });
    //socket for video call feature implementation ends
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected!`);
    });
});
