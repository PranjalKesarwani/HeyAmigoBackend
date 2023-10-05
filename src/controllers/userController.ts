import { Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import { createJwt } from "../config/createToken";


export const signup = async (req: any, res: Response) => {


    const { username, email, password } = req.body;
    const user = await UserModel.create({
        user: username,
        email: email,
        password: password
    })
    // let token = createJwt(user!._id.toString());
    // const options = {
    //     expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),  //90 days expiration 
    //     httpOnly: true
    // }

    // res.status(201).cookie("jwt",token,options).json(user);
    res.status(200).json(user);



}
export const login = async (req: any, res: Response) => {


    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });



    bcrypt.compare(password, user?.password!, function (err, data) {

        if (err) {
            console.log(err);
            res.status(500).send("Some error occured! Try again.")
            throw new Error("Got some error");
        }
        else if (data) {

            // let token = createJwt(user!._id.toString());

            // const options = {
            //     expiresIn: "10d",
            //     httpOnly: true
            // }

            // res.cookie("jwt", token, options);
            res.status(201).json(user);
            // res.status(201).cookie("jwt",token,options).json(user);



        } else {
            res.status(406).send("Password do not match")
        }
    });





}