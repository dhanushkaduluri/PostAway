import mongoose from "mongoose";

export const friendShema=new mongoose.Schema(
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