import express from "express"
import { getUserData, login, searchUser, signup } from "../controllers/userController";
import auth from "../Middleware/auth"

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/getuserdata",auth,getUserData);
// router.get("/getuserdata",getUserData);
router.get("/searchuser",auth,searchUser);

export default router