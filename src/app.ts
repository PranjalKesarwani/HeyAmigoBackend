import express, { Request, Response } from "express";
import "./config/server";
const PORT = 5000 || process.env.PORT;

import authRoutes from "./routes/authRoutes"
import cors from "cors";
const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

}));

app.use(express.json());

// app.get("/api",(req,res)=>{
//     res.send('server working')
// })

app.listen(PORT, () =>
    console.log(`server listening on port ${PORT}`)
);


app.use("/api/auth",authRoutes);





