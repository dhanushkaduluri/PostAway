import mongoose from 'mongoose';
import { userSchema } from './user.schema.js';
import ApplicationError from '../../middlewares/errorHandler.middleware.js';

export const UserModel=mongoose.model("User",userSchema);

export default class UserRepository{

    async signUp(user){
        try {
            const newUser=new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    
    async getUser(email){
        try {
            const user=await UserModel.findOne({email:email});
            if(!user){
                throw new ApplicationError(400,"Invalid Credentials");
            }
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAll(){
        try {
            const user=await UserModel.find();
            if(!user){
                throw new ApplicationError(400,"No Users Found");
            }
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id){
        try {
            const user=await UserModel.findById(id);
            if(!user){
                throw new ApplicationError(400,"Invalid user");
            }
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async resetPassword(id,newPassword){
        try {
            const user=await UserModel.findById(id);
            if(!user){
                throw new ApplicationError(400,"user not found");
            }
            user.password=newPassword;
            console.log(await user.save());
            return user;

        } catch (error) {
            throw error;
        }
    }

    async addToken(email, password, token) {
        try {
          const user = await UserModel.findOne({ email:email});
      
          if (!user) {
            throw new ApplicationError(404,'User not found');
          }
      
          // Check if the token already exists in the user's tokens array
          if (!user.tokens.includes(token)) {
            user.tokens.push(token);
            await user.save();
          } else {
            console.log('Token already exists for the user');
          }
        } catch (error) {
          console.error('Error adding token:', error);
          throw error;
        }
    }
      
    async logoutAll(userId){
        try {
            // Find the user by ID and update tokenVersion and clear tokens
            const result = await UserModel.updateOne(
              { _id: userId },
               { $set: { tokens: [] } }
            );
        
            if (result.matchedCount === 0) {
              return { message: 'User not found' };
            }
        
            return { message: 'Logged out from all devices successfully' };
          } catch (err) {
            console.error('Error during logout:', err);
            throw err;
          }
    }

}