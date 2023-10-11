import express from "express"
import { getGrpContacts, grpChatCreator } from "../controllers/grpChatController";
import auth from "../Middleware/auth";

const router = express.Router();

router.post("/create-grp",auth,grpChatCreator);
router.get("/get-g-contacts",auth,getGrpContacts);


export default router