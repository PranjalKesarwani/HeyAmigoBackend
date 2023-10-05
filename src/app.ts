import express, { Request, Response } from "express";
import "./config/server";
const PORT = 5000 || process.env.PORT;
import cookieParser from "cookie-parser"

import userRoutes from "./routes/userRoutes"
import messageRoutes from "./routes/messageRoutes"
import mediaRoutes from "./routes/mediaRoutes"
import contactRoutes from "./routes/contactRoutes"
import grpContactRoutes from "./routes/grpContactRoutes"
import cors from "cors";
const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

}));

app.use(express.json());
app.use(cookieParser());




app.listen(PORT, () =>
    console.log(`server listening on port ${PORT}`)
);


app.use("/api/auth",userRoutes);
app.use("/api/messageroutes",messageRoutes)
app.use("/api/contactroutes",contactRoutes)
app.use("/api/grpcontactroutes",grpContactRoutes)
app.use("/api/mediaroutes",mediaRoutes)





