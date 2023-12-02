import express, { Request, Response } from "express";
import "./config/server";
const PORT = 5000 || process.env.PORT;
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes"
import messageRoutes from "./routes/messageRoutes"
import chatRoutes from "./routes/chatRoutes"
import grpChatRoutes from "./routes/grpChatRoutes"
import cors from "cors";
import { Server } from "socket.io";
import { v2 } from "cloudinary";

import { createServer } from 'node:http';
import { type } from "node:os";
import User from "./models/userModel";
const app = express();
const server = createServer(app);
app.use(cors());
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*"
    }
});

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// app.use(cors({
//     origin: "http://127.0.0.1:5173",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials:true, //It enables cookies and authentication headers
//     optionsSuccessStatus:204, //No content response for preflight requests
//     allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],

// }));







server.listen(PORT, () =>
    console.log(`server listening on port ${PORT}`)
);

app.use(express.json());
app.use(cookieParser());
app.get('/', async (req, res) => {
    const doc = await User.find({ username: 'e' });
    res.json(doc);
})
app.use("/api/auth", userRoutes);
app.use("/api/message-routes", messageRoutes)
app.use("/api/chat-routes", chatRoutes)
app.use("/api/grpcontact-routes", grpChatRoutes)

// Socket-------------------------s


// types------------------------------------
type TUser = {
    _id: string;
    email: string;
    username: string;
    pic: string
}

type TArgsendInUserRoom = {
    userId: string,
    usersArray: TUser[];
    chatId:string,
    msgId:string
}
// types------------------------------------

io.on('connection', async (socket) => {
    console.log(`Socket ${socket.id} connected`);

    //Creating room using userId
    socket.on('createUserRoom', (userInfo: { userId: string }) => {
        socket.join(userInfo.userId);
        socket.emit('createdUserRoom');
    });
    socket.on('sentMsgInUserRoom', (data: TArgsendInUserRoom) => {
        if (!data.usersArray) {
            return console.log('Error in users array');
        }

        data.usersArray.forEach((element: TUser) => {

            if (data.userId === element._id) return;

            socket.in(element._id).emit('receivedMsg',{chatId:data.chatId,msgId:data.msgId,});
        });


    })

    socket.on('sentMsgInUserRoomForG', (data: TArgsendInUserRoom) => {
        if (!data.usersArray) {
            return console.log('Error in users array');
        }

        data.usersArray.forEach((element: TUser) => {

            if (data.userId === element._id) return;

            socket.in(element._id).emit('receivedMsgForG');
        });


    })

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected!`)
    })

})





