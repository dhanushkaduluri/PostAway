import bcrypt from 'bcrypt'
import ApplicationError from '../middlewares/errorHandler.middleware.js';

export const hashPassword=async(password)=>{
    try {
        const HP=await bcrypt.hash(password,12);
        return HP;
    } catch (error) {
        throw new ApplicationError(400,"error encountered while hashing the password");
    }
}

export const compare=async(hashedPassword,password)=>{
    try {
        const result = bcrypt.compare(password,hashedPassword);
        return result;
    } catch (error) {
        throw new ApplicationError(400,"error encountered while comparing the hashed password");
    }
}