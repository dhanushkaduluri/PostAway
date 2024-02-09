import express from 'express';
import otp_Controller from './otp.controller.js';

const otpRouter=express.Router();
const otpController=new otp_Controller();

otpRouter.post('/send',(req,res,next)=>{
    otpController.sendOtp(req,res,next);
})

otpRouter.post('/verify',(req,res,next)=>{
    otpController.validateOTP(req,res,next);
})

export default otpRouter;