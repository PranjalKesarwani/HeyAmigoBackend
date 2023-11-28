import express from "express"
import {  getUserData, login, logout, registerGuest, searchUser, signup, uploadUserPic } from "../controllers/userController";
import auth from "../Middleware/auth"

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/guest",registerGuest);
router.post('/upload_user_pic',auth,uploadUserPic);
router.get("/logout",auth,logout);
router.get("/getuserdata",auth,getUserData);
router.get("/searchuser",auth,searchUser);
// router.get('/check_authentication',auth,checkAuth);

export default router