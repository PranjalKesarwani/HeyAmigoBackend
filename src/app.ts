import express, { Request, Response } from "express";
import "./config/server";
const PORT = process.env.PORT || 5000;
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes"
import messageRoutes from "./routes/messageRoutes"
import chatRoutes from "./routes/chatRoutes"
import grpChatRoutes from "./routes/grpChatRoutes"
import cors from "cors";
import { Server } from "socket.io";
import { v2 } from "cloudinary";

import { createServer } from 'node:http';
import User from "./models/userModel";
const app = express();
// const origin = 'http://127.0.0.1:5173';
// const origin = "https://heyamigo.netlify.app";
const origin = "https://heyamigov2.netlify.app";




app.use(cors({
    origin: origin,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Origin', 'Accept', 'X-Requested-With', 'Content-Type', 'Authorization'],
    preflightContinue: true,
    optionsSuccessStatus: 204
}))

const server = createServer(app);

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: origin
    }
});

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

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
    chatId: string,
    msgId: string
}
// types------------------------------------

const emailToSocketIdMap = new Map();
const socketIdToemailMap = new Map();
const emailToSocketIdMapI = new Map();
const socketIdToemailMapI = new Map();

io.on('connection', async (socket) => {
    console.log(`Socket ${socket.id} connected`);

    //Creating room using userId
    socket.on('createUserRoom', (userInfo: { userId: string }) => {
        socket.join(userInfo.userId); //isse room create hota hai  and agar existing room me jana hai toh io.to()
        socket.emit('createdUserRoom');
    });
    socket.on('sentMsgInUserRoom', (data: TArgsendInUserRoom) => {
        if (!data.usersArray) {
            return console.log('Error in users array');
        }

        data.usersArray.forEach((element: TUser) => {

            if (data.userId === element._id) return;

            socket.in(element._id).emit('receivedMsg', { chatId: data.chatId, msgId: data.msgId, });
        });


    })

    socket.on('sentMsgInUserRoomForG', (data: TArgsendInUserRoom) => {
        if (!data.usersArray) {
            return console.log('Error in users array');
        }

        data.usersArray.forEach((element: TUser) => {

            if (data.userId === element._id) return;

            socket.in(element._id).emit('receivedMsgForG', { chatId: data.chatId, msgId: data.msgId });
        });


    })

    //socket for video call feature demo begins

    socket.on('room:join', (data) => {
        const { email, room } = data;
        console.log(email, room);
        // emailToSocketIdMap.set(email,socket.id);
        // socketIdToemailMap.set(socket.id,email);
        //if the room already exist at global level, then the incoming user will join the room so only then this socket will work and if the room does not exist then only socket.join will create a room using that roomId
        io.to(room).emit('user:joined', { email, id: socket.id }) //if new user comes in existing room then we will join hi then push in the room
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

    })

    //socket for video call feature demo ends


    //socket for video call feature implementation begins


    socket.on('room:joinI', (data) => {
        const { roomId } = data;
        console.log(roomId);
        // emailToSocketIdMapI.set(email,socket.id);
        // socketIdToemailMapI.set(socket.id,email);
        //if the room already exist at global level, then the incoming user will join the room so only then this socket will work and if the room does not exist then only socket.join will create a room using that roomId
        io.to(roomId).emit('user:joinedI', { id: socket.id }) //if new user comes in existing room then we will join hi then push in the room
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

    })
    socket.on('hanged', ({ to }) => {
       
        io.to(to).emit('hang:call', { msg: 'call hanged' });
    })

    //socket for video call feature implementation ends

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected!`);
    })

})





