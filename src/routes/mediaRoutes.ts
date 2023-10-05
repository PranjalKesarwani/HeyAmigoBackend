import express from "express"
import { mediaController } from "../controllers/mediaController";


const router = express.Router();

router.get("/test",mediaController)


export default router