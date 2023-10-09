import { Response } from "express";


export const grpContactController  =(req:any,res:Response)=>{
    res.send(req.body);
}