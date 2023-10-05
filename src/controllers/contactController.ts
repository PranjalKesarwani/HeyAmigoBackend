import { Response } from "express"
export const contactController  =(req:any,res:Response)=>{
    res.send("hello from contact controller");
}