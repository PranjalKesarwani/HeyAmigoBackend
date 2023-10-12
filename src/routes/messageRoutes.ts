import express from "express"
import { createGrpMessage, createPMessage, fetchAllMessages } from "../controllers/messageController";
import auth from "../Middleware/auth";


const router = express.Router();

router.post("/message",auth,createPMessage);
router.post("/g-message",auth,createGrpMessage);
router.get("/:chatId",auth,fetchAllMessages);


export default router