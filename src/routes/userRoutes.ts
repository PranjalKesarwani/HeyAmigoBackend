import express from "express"
import { getUserData, login, logout, searchUser, signup, uploadUserPic } from "../controllers/userController";
import auth from "../Middleware/auth"

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",auth,logout);
router.get("/getuserdata",auth,getUserData);
router.get("/searchuser",auth,searchUser);
router.post('/upload_user_pic',auth,uploadUserPic);

export default router