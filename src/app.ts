import express,{Request, Response} from "express";
import "./config/server"

const app = express();


app.get("/",(req:Request,res:Response)=>{
    res.send("hello from backend!");
})





