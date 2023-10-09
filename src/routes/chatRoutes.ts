import express from "express"
import { createChat, getPContacts } from "../controllers/chatController";
import auth from "../Middleware/auth";

const router = express.Router();

router.post("/create-chat",auth,createChat);
router.get('/get-p-contacts',auth,getPContacts)

export default router