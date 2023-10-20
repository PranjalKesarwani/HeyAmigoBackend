import express from "express"
import { getGrpContacts, grpChatCreator, updateGrpChatInfo } from "../controllers/grpChatController";
import auth from "../Middleware/auth";

const router = express.Router();

router.post("/create-grp",auth,grpChatCreator);
router.post("/update-grp/:chatId",auth,updateGrpChatInfo);
router.get("/get-g-contacts",auth,getGrpContacts);


export default router