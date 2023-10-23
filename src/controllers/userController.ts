import { Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import { createJwt } from "../config/createToken";
import User from "../models/userModel";


export const signup = async (req: any, res: Response) => {

    try {
        const { username, email, password } = req.body;

        const isUserExist = await UserModel.findOne({ username: username, email: email });

        if (!isUserExist) {
            const user = await UserModel.create({
                username: username,
                email: email,
                password: password,

            })
            let token = createJwt(user!._id.toString());
            const options = {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),

                httpOnly: true
            }

            res.status(201).cookie("jwt", token, options).json({ isAuthenticated: true, msg: "Sign Up successful!" });
        } else {
            res.status(200).json({ msg: "User already exist!" })
        }



    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error! Try again." })
    }



}
export const login = async (req: any, res: Response) => {

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    try {

        if (user) {
            bcrypt.compare(password, user?.password!, function (err, data) {

                if (err) {
                    console.log(err);
                    res.status(205).send("Wrong Password!")
                    throw new Error("Got some error");
                }
                else if (data) {

                    let token = createJwt(user!._id.toString());
                    const options = {
                        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }

                    res.status(200).cookie("jwt", token, options).json({ isAuthenticated: true, msg: "Log In successful!" });

                } else {
                    res.status(406).send("Password do not match")
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: "Internal server error! Try again." })
    }

}

export const logout = async (req: any, res: Response) => {

    try {

        res.status(200).clearCookie('jwt').json({msg:'Logged out successfully'});
        
    } catch (error) {
        console.log(error);
    }


}

export const getUserData = async (req: any, res: Response) => {

    try {

        const userId = req.user._id;
        const userData = await UserModel.findOne(userId).select("_id username pic email");



     


        res.status(200).json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error!" })
    }


}

export const searchUser = async (req: any, res: Response) => {

    try {
        const currentUserId = req.user;

        const regex = new RegExp(`${req.query.search}`, 'i')
        const query = {
            _id: { $ne: currentUserId },
            $or: [
                { username: { $regex: regex } },
                { email: { $regex: regex } },
            ]

        }

        const allSearchedUser = await UserModel.find(query).select("_id username email")

        res.status(200).json(allSearchedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }


}

export const uploadUserPic = async(req:any,res:Response)=>{

    try {
        const {imgUrl} = req.body;
        const userId = req.user;
    
        const userDoc = await UserModel.findByIdAndUpdate(userId,{pic:imgUrl});
        console.log(userDoc);
    
    
        res.status(200).json({msg:'success'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal server error"});
    }

   
}