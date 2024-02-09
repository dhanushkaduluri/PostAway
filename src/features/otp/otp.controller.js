import Otp_Model from "./otp.model.js";

export default class otp_Controller{
    constructor(){
        this.otpModel=new Otp_Model();
    }

    async sendOtp(req,res,next){
        try {
            const email=req.body.email;
            const result=await this.otpModel.sendOTP(email,next);
            if(result){
                res.status(200).send("OTP sent successfully")
            }
        } catch (error) {
            next(error)
        }
    }

    async validateOTP(req,res,next){
        try {
            const {otp,email}=req.body;
            const result=await this.otpModel.validateOTP(email,otp);
            if(result===true){
                res.status(200).send({success:true,msg:"OTP matched"});
            }else{
                res.status(400).send({success:false,msg:"OTP not matched"});
            }
        } catch (error) {
            next(error);
        }
    }
}
