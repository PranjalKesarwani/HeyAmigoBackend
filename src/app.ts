import express, { Request, Response } from "express";
import "./config/server";
const PORT = 5000 || process.env.PORT;
import cookieParser from "cookie-parser"

import userRoutes from "./routes/userRoutes"
import messageRoutes from "./routes/messageRoutes"
import chatRoutes from "./routes/chatRoutes"
import grpChatRoutes from "./routes/grpChatRoutes"
import cors from "cors";
const app = express();
app.use(cors());
// app.use(cors({
//     origin: "http://127.0.0.1:5173",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials:true, //It enables cookies and authentication headers
//     optionsSuccessStatus:204, //No content response for preflight requests
//     allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    
// }));


app.use(express.json());
app.use(cookieParser());




app.listen(PORT, () =>
    console.log(`server listening on port ${PORT}`)
);

app.get("/api/testing",(req,res)=>{
    res.send("10");
})


app.use("/api/auth",userRoutes);
app.use("/api/message-routes",messageRoutes)
app.use("/api/chat-routes",chatRoutes)
app.use("/api/grpcontact-routes",grpChatRoutes)





