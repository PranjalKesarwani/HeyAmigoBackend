import { Response } from "express"

export const mediaController = (req:any,res:Response)=>{
    res.send("Hello from mediaController");
}