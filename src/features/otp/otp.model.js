import randomstring from "randomstring";
import { sendOtpMail } from "../../utils/sendOtp.utils.js";

const users={};

export default class Otp_Model{
    async sendOTP(email,next){
        try{
            const otp=randomstring.generate(6);
            users[email]={otp};
            const status=await sendOtpMail(email,otp,next);
            if(status){
                return true;
            }
        
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async validateOTP(email,otp){
        try {
            console.log(users[email]);
            if(users[email]&&users[email].otp===otp){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            throw error;
        }
    }
}