import { NextFunction ,Request,Response} from "express"
import { HttpError } from "http-errors"
import envConfig from "../Config/config"


const globalErrorHndling =(err:HttpError,req:Request,res:Response,next:NextFunction)=>{
const statusCode =err.statusCode || 500
res.status(statusCode).json({
    message:err.message,
    errorStack :envConfig.environment==="development" ? err.stack:"something went wrong "


    
})
}

export default globalErrorHndling