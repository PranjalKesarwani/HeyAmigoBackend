import express from "express"
import { createChat, getPContacts, reset_notification, set_notification } from "../controllers/chatController";
import auth from "../Middleware/auth";

const router = express.Router();

router.post("/create-chat",auth,createChat);
router.get('/get-p-contacts',auth,getPContacts);
router.post('/set_notification',auth,set_notification);
router.post('/reset_notification',auth,reset_notification);

export default router