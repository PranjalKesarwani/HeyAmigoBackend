"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/server");
const PORT =  process.env.PORT || 5000;
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
const origin = "https://heyamigo.netlify.app/";
// app.use(cors({
//     origin: origin,
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: ['Content-Type'],
//     preflightContinue:true,
//     optionsSuccessStatus:204
// }));
app.use((0, cors_1.default)({
    origin: origin,
    credentials: true
}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.header(
        "Access-Control-Allow-Headers"

    );
    next();
});
// app.use((req: any, res: Response, next) => {
//     // res.header("Access-Control-Allow-Origin", origin);
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     // res.setHeader('Access-Control-Allow-Origin', origin); 
//     // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//     // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.set({
//         'Access-Control-Allow-Origin': origin,
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
//         'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, X-Requested-With, Authorization'
//     });
//     next();
// });
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
io.on('connection', async (socket) => {
    console.log(`Socket ${socket.id} connected`);
    //Creating room using userId
    socket.on('createUserRoom', (userInfo) => {
        socket.join(userInfo.userId);
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
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected!`);
    });
});
