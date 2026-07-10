import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL = process.env.MONGO_URL;
export async function connectDB(){  //const connectDB = async()=>{} using arrow function
    try{
        await mongoose.connect(URL);
        console.log("MongoDB Connected");
    }
    catch(err){
        console.log("Errors",err);
    }
}