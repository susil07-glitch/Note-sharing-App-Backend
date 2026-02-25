import express from "express";
import { storage, multer } from "../MiddleWares/multerMiddleWare";
import { registerUser } from "./AuthController";

const authRoutes = express.Router();

const upload = multer({ storage: storage });


authRoutes.route("/register").post(upload.single("file"),registerUser)

export default authRoutes;
