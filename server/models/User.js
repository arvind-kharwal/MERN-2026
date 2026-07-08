import mongoose  from "mongoose";

const userSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name:{
            type: String
        },
        email:{
            type: String
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("user",userSchema)