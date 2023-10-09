import express from "express"
import { grpContactController } from "../controllers/grpContactController";
import auth from "../Middleware/auth";

const router = express.Router();

router.post("/create-grp",auth,grpContactController)


export default router