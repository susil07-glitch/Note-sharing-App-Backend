

import { NextFunction, Request,Response } from "express";
import noteModel from "./noteModel";
import envConfig from "../Config/config";
import globalErrorHndling from "../MiddleWares/globalErrorHandling";
import createHttpError from "http-errors";

const createNote = async(req:Request,res:Response ,next:NextFunction)=>{
   try {
    const file =req.file ?`${envConfig.backendurl},${req.file.filename}`:" ";
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
    console.log(error);
     return next(createHttpError(500,'Error While creating note '))


    
   }
}


export default createNote
