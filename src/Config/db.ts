import mongoose from "mongoose";
import envConfig from "./config";

const connectToDatabase = async()=>{
    try{
         await mongoose.connect(envConfig.mongodburi as string ,{
            connectTimeoutMS:5000,
            
         })
         mongoose.connection.on("connected",()=>{

            console.log("Connected to Database Successfully !!!");

         })
    } catch(error){
        console.log("Failed to connect to Databse !!!",error)
        process.exit(1);

    }
 
}

export default connectToDatabase;