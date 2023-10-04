import { Response } from "express";
import UserModel from "../models/userModel"

export const signup = async(req:any,res:Response)=>{
    console.log(req.body)

    const {username,email,password} = req.body;
        const userFile = await UserModel.create({
            user:username,
            email:email,
            password:password
        })
    res.send(userFile);
   

}
export const login = (req:any,res:Response)=>{
    console.log("receiveed");
    res.send(req.body)

}