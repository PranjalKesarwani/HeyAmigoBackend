import express from "express"
import { createMessage, fetchAllMessages } from "../controllers/messageController";
import auth from "../Middleware/auth";


const router = express.Router();

router.post("/message",auth,createMessage);
router.get("/:chatId",auth,fetchAllMessages);


export default router