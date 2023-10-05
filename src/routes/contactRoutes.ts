import express from "express"
import { contactController } from "../controllers/contactController";

const router = express.Router();

router.get("/test",contactController)

export default router