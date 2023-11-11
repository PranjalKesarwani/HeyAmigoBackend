import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import UserModel from "../models/userModel";


const auth = async (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    //if the request does not have token
    if (!token) {
      return  res.status(401).json({ isAuthenticated: false });
    }

    const requestedId = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload


    //Finding userDetails using id
    const userFile = await UserModel.findById(requestedId.id);

    if (!userFile) {
      return  res.status(401).json({ isAuthenticated: false });
    }


    req.user = userFile!._id;

    next()


}
export default auth;

