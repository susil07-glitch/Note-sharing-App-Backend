

import { Request,Response } from "express";
import noteModel from "./noteModel";
import envConfig from "../Config/config";

const createNote = async(req:Request,res:Response)=>{
   try {
    const file =req.file ?`${envConfig.backendurl},${req.file.filename}`:"";
    const {title ,subtitle,description}=req.body;
    if(!file || !title || !description){
        res.status(400).json({
            message:"Please provide title,subtitle,description and file"
        })
        return 

    }
    await noteModel.create({
        title,
        subtitle,
        description,
        file
    })
    res.status(201).json({
        message:"Note. created successfully"

    })
   } catch (error) {
    console.log("Note creation failed !!!");

    
   }
}


export default createNote
