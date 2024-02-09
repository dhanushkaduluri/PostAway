import { hash } from "bcrypt";
import ApplicationError from "../../middlewares/errorHandler.middleware.js";
import { compare, hashPassword } from "../../utils/hashPassword.util.js";
import UserRepository from "./user.repository.js";
import jwt from 'jsonwebtoken';

export default class UserController{
    constructor(){
        this.userRepo=new UserRepository();
    }

    async signUp(req,res,next){
        try {
            const user=req.body;
            user.password=await hashPassword(user.password);
            const result=await this.userRepo.signUp(user);
            res.status(201).send(
                {
                    success:true,
                    message:result
                }
            )
        } catch (error) {
            next(error);
        }
    }

    async signIn(req,res,next){
        try {
            const {email,password}=req.body;
            const user=await this.userRepo.getUser(email);
            const result=await compare(user.password,password);
            const hashedPassword=await hashPassword(password);
            if(result){
                try{
                    const token=jwt.sign(
                        {userId:user._id,user:user},
                        process.env.SECRET_KEY,
                        {
                            expiresIn:'5h'
                        }
                    );
                    await this.userRepo.addToken(email,hashedPassword,token);
                    res
                    .cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000})
                    .json({ success: true, msg: "user login successful", token });
                }catch(error){

                }
            }
        } catch (error) {
            next(error);
        }

    }
    
    async getUser(req,res,next){
        try {
            const userId=req.params.id;
            const result=await this.userRepo.getById(userId);
            res.status(200).send(
                {
                    success:true,
                    message:result
                }
            )
        } catch (error) {
            next(error);
        }
    }

    async getAll(req,res,next){
        try {
            const result=await this.userRepo.getAll();
            res.status(200).send(
                {
                    success:true,
                    message:result
                }
            )
        } catch (error) {
            next(error);
        }
    }

    async logout(req,res,next){
        try {
            res.clearCookie('jwtToken');
            res.status(201).send(
                {
                    success:true,
                    message:"you are logged out"
                }
            )
        } catch (error) {
            next(error);
        }
    }

    async logoutAll(req,res,next){
        try {
               // Clear the authToken cookie
            res.clearCookie('jwtToken');
            const userId=req.id;
            const result=await this.userRepo.logoutAll(userId);
            res.status(201).send(
                {
                    success:true,
                    message:result.message
                }
            )
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req,res,next){
        try {
            const userId=req.cookies.id;
            const newPassword=await hashPassword(req.body.password);
            const result=await this.userRepo.resetPassword(userId,newPassword);
            if(result){
                res.status(200).send(
                    {
                        success:true,
                        message:result
                    }
                )
            }else{
                res.status(400).send(
                    {
                        success:false,
                        message:"password reset failed"
                    }
                )
            }
        } catch (error) {
            next(error);
        }
    }
}