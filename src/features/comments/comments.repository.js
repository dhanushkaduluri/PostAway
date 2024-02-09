import mongoose from 'mongoose';
import { commentSchema } from './comments.schema.js';
import ApplicationError from '../../middlewares/errorHandler.middleware.js';
import { ObjectId } from 'mongodb';

const CommentModel=mongoose.model('Comment',commentSchema);

export default class CommentRepository{

    async addComment(userId,postId,comment){
        try {
            const newComment=new CommentModel(
                {
                    user:userId,
                    post:postId,
                    comment:comment
                }
            )
            await newComment.save();
            return newComment;
        } catch (error) {
            throw error
        }
    }

    async updateComment(id,userId,newComment){
        try {
            const prevComment=await CommentModel.findOne({_id:id,user:new ObjectId(userId)});
            if(!prevComment){
                throw new ApplicationError(400,'comment not found');
            }
            prevComment.comment=newComment;
            await prevComment.save();
            return prevComment;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteComment(id,userId,newComment){
        try {
            const comment=await CommentModel.deleteOne({_id:id,user:new ObjectId(userId)});
            if(!comment){
                throw new ApplicationError(400,'comment not found');
            }
            return comment;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getComments(postId){
        try {
            const comments=await CommentModel.find(
                {
                    post:new ObjectId(postId)
                }
            ).populate('user').populate('post');
            if(!comments){
                throw new ApplicationError(400,"No comments found");
            }
            return comments;
        } catch (error) {
            throw error;
        }
    }

}