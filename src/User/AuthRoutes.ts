import express from "express";
import { storage, multer } from "../MiddleWares/multerMiddleWare";
import { loginUser, registerUser } from "./AuthController";

const authRoutes = express.Router();

const upload = multer({ storage: storage });


authRoutes.route("/register").post(upload.single("file"),registerUser)
authRoutes.route("/login").post(loginUser)

export default authRoutes;
