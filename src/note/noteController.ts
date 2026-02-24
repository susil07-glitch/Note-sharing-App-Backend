

import { NextFunction, Request,Response } from "express";
import noteModel from "./noteModel";
import envConfig from "../Config/config";

import createHttpError from "http-errors";

const createNote = async(req:Request,res:Response,next:NextFunction)=>{
   try {
    const file =req.file ?`${envConfig.backendurl}/${req.file.filename}`:'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D';
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
        message:"Note created successfully"
        

    })
   
   } catch (error) {
    console.log(error);
     return next(createHttpError(500,'Error While creating note '))


    
   }
}


export default createNote
