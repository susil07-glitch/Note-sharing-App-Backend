import mongoose from "mongoose";
import { Note } from "./noteTypes";

const noteSchema = new mongoose.Schema<Note>({
    
    title:{
        type:String,
        required:true

    },
    subtitle:{
        type:String
    },
     
    description:{
        type:String,
        required:[true ,"Description must be  required "]
    },
    file:{
        type:String
    },
    
},{timestamps:true})

const note = mongoose.model("note",noteSchema);

export default note;