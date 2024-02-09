import mongoose from "mongoose";

export const friendRequestSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        friendId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    }
)