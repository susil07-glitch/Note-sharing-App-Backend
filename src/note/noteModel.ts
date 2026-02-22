import mongoose from "mongoose";
import { Note } from "./noteTypes";

const noteSchema = new mongoose.Schema<Note>({
    
    title:{
        type:String,
        required:true

    },
    subtitle:String,
     
    description:{
        type:String,
        required:[true ,"Description must be  required "]
    },
    file:String,
    
},{timestamps:true})

export default mongoose.model<Note>("Note",noteSchema)