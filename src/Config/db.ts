import mongoose from "mongoose";
import envConfig from "./config";

const connectToDatabase = async()=>{
    try{
         mongoose.connect(envConfig.mongodburi as string )
         mongoose.connection.on("connected",()=>{
            console.log("Connected to Database Successfully !!!");

         })
    } catch(error){
        console.log("Failed to connect to Databse !!!")
        process.exit(1);

    }
 
}

export default connectToDatabase;