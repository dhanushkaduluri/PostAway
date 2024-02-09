import mongoose from 'mongoose';

export const LikeSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        likeable:{
            type:mongoose.Schema.Types.ObjectId,
            refPath:'type',
            required:true
        },
        type:{
            type:String,
            enum:["Comment","Post"],
            required:true
        }
    }
)