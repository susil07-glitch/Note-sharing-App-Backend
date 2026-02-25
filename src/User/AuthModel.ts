import mongoose from "mongoose";
import { User } from "./AuthTypes";

const userSchema = new mongoose.Schema<User>({
  UserName: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
},{timestamps:true});

const user= mongoose.model("user",userSchema)

export default user;

