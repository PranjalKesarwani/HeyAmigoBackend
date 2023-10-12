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


import { createServer } from 'node:http';
const app = express();
const server = createServer(app);
app.use(cors());
const io = new Server(server,{
    cors:{
        origin:"*"
    }
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
app.use("/api/auth", userRoutes);
app.use("/api/message-routes", messageRoutes)
app.use("/api/chat-routes", chatRoutes)
app.use("/api/grpcontact-routes", grpChatRoutes)

// Socket-------------------------s

io.on('connection', async(socket) => {
    console.log(`Socket ${socket.id} connect`);
    socket.on("setup",(userData)=>{
        socket.join(userData._id); //created room for userId;
        socket.emit('connected');
    });

    socket.on('join-room',(data)=>{
        socket.join(data.chatId);
        socket.in(data.chatId).emit('sent','working');
        socket.emit('chatRoom')
        console.log('chat room created');
    });
    // socket.on('roomMsg',(msgData)=>{
    //     console.log(msgData);
    //     socket.in(msgData.chatId).emit('room-msg',{msg:msgData.message})
    // })



    socket.on('message sent',(sentMessage)=>{
        console.log(sentMessage);
        sentMessage.users.forEach((userInfo:any) => {
            if(sentMessage.senderId === userInfo._id) {return ;}
            socket.in(userInfo._id).emit('message received',{message:sentMessage.message})
        });
    })

   

  socket.on('disconnect',()=>{
    console.log(`Socket ${socket.id} disconnected!`)
  })

})





