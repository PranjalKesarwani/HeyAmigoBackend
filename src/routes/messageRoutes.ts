import express from "express"
import { messageController } from "../controllers/messageController";


const router = express.Router();

router.get("/test",messageController)


export default router