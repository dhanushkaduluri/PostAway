import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        match:[/.+\@.+\../,"Please enter a valid email"]
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"],
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    tokens:[
        {
            type:String
        }
    ]
})