import mongoose from 'mongoose';
import { PostSchema } from './post.schema.js';
import ApplicationError from '../../middlewares/errorHandler.middleware.js';
import { ObjectId } from 'mongodb';

const PostModel=mongoose.model('Post',PostSchema);

export default class PostRepository{

    async addPost(caption,imageUrl,userId){
        try {
            const newPost=new PostModel(
                {
                    caption:caption,
                    imageUrl:imageUrl,
                    user:userId
                }
            );
            await newPost.save();
            return newPost;
        } catch (error) {
            throw error;
        }
    }

    async getpost(id){
        try {
            const post= await PostModel.findById(id);
            if(!post){
                throw new ApplicationError(400,"Post not found");
            }
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllPostsOfUser(userId){
        try {
            const posts=await PostModel.find({user:userId});
            if(!posts||!posts[0]){
                throw new ApplicationError(400,"no posts found")
            }
            return posts;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deletePost(id,userId){
        try {
            const post= await PostModel.deleteOne({_id:id,user:new ObjectId(userId)});
            if(!post){
                throw new ApplicationError(400,"Post not found");
            }
            console.log(post);
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updatePost(id,caption,imageUrl,userId){
        try {
            const post= await PostModel.findOne({_id:id,user:new ObjectId(userId)});
            if(!post){
                throw new ApplicationError(400,"Post not found");
            }
            post.caption=caption;
            post.imageUrl=imageUrl;
            await post.save();
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAll(){
        try {
            const posts=await PostModel.find();
            if(!posts||!posts[0]){
                throw new ApplicationError(400,"no posts found")
            }
            return posts;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}