import express from "express"
import { messageController } from "../controllers/messageController";
import auth from "../Middleware/auth";


const router = express.Router();

router.post("/message",auth,messageController)


export default router