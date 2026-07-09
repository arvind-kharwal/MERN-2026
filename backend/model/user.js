import { createRequire } from "module";
import mongoose  from "mongoose";

const userSchema = new mongoose.Schema(
    {
        password: {
            type: String,
            required: true,
            
        },
        name:{
            type: String
        },
        email:{
            type: String,
             required: true,
             unique:true

        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("user",userSchema)