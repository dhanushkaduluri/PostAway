import mongoose from 'mongoose';
import { LikeSchema } from './likes.schema.js';
import { ObjectId } from 'mongodb';
 
const LikeModel=mongoose.model('Like',LikeSchema);

export default class LikeRepository{

    async LikePost(userId,id,type){
        try {
            const like=new LikeModel(
                {
                   user:userId,
                   likeable:id,
                   type:type
                }
            )
            await like.save();
            return like;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getLikes(id,type){
        try {
            const result= await LikeModel.find(
                {
                    likeable:new ObjectId(id),
                    type:type
                }
            ).populate('user').populate(
                {
                    path:'likeable',
                    model:type
                }
            );
            console.log(result);
            return result;
        } catch (error) {
            throw error
        }
    }

}