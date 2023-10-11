import express from "express"
import { createGrpMessage, createMessage, fetchAllMessages } from "../controllers/messageController";
import auth from "../Middleware/auth";


const router = express.Router();

router.post("/message",auth,createMessage);
router.post("/g-message",auth,createGrpMessage);
router.get("/:chatId",auth,fetchAllMessages);


export default router