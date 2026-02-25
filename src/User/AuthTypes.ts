

export interface User{
    UserName:String,
    Password:String,
    Email:String
}

import { Document } from "mongoose";

export interface IUser extends Document {
  Email: string;
  Password: string;
}
