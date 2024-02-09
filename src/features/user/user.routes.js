import express from 'express';
import UserController from './user.controller.js';
import { jwtAuth } from '../../middlewares/jwtAuth.middleware.js';

const userRouter = express.Router();

const userController=new UserController();

userRouter.post('/signup',(req,res,next)=>{
    userController.signUp(req,res,next);
})

userRouter.post('/signin',(req,res,next)=>{
    userController.signIn(req,res,next);
})

userRouter.get('/get-details/:id',jwtAuth,(req,res,next)=>{
    userController.getUser(req,res,next);
})

userRouter.get('/get-all-details',jwtAuth,(req,res,next)=>{
    userController.getAll(req,res,next);
})

userRouter.get('/logout',jwtAuth,(req,res,next)=>{
    userController.logout(req,res,next);
})

userRouter.get('/logout-all-devices',jwtAuth,(req,res,next)=>{
    userController.logoutAll(req,res,next);
})

userRouter.put('/update-details/:id',jwtAuth,(req,res,next)=>{
    userController.resetPassword(req,res,next);
})

export default userRouter;