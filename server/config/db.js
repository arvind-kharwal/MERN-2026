import mangoose from "mongoose"
import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config();
const URL = process.env.MONGO_URL;
export const connectDB= async()=>{
    try{
        await mongoose.connect(URL);
        console.log("Mongodb Connected");
    }
    catch(err){
        console.log("Error",err);
    }
}