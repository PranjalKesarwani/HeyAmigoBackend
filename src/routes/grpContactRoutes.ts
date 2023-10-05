import express from "express"
import { grpContactController } from "../controllers/grpContactController";

const router = express.Router();

router.get("/test",grpContactController)


export default router