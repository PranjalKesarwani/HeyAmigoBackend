import { Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs"
import { errorMonitor } from "events";

export const signup = async (req: any, res: Response) => {
    console.log(req.body)

    const { username, email, password } = req.body;
    const userFile = await UserModel.create({
        user: username,
        email: email,
        password: password
    })
    res.status(201).send(userFile);


}
export const login = async (req: any, res: Response) => {
    console.log("receiveed");

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    console.log(user);

    bcrypt.compare(password, user?.password!, function (err, data) {

        if (err) {
            console.log(err);
            res.status(500).send("Some error occured! Try again.")
            throw new Error("Got some error");
        }
        else if (data) {
            console.log(data);
            res.send("Login successful")
        } else {
            res.status(406).send("Password do not match")
        }
    });



    

}