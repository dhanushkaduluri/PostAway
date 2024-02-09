import express from 'express';
import PostController from './post.controller.js';
import { uploadFile } from '../../middlewares/fileHandler.middleware.js';

const postRouter=express.Router();

const postController=new PostController();

postRouter.post('/',uploadFile,(req,res,next)=>{
    postController.addPost(req,res,next);
})

postRouter.put('/:id',uploadFile,(req,res,next)=>{
    postController.updatePost(req,res,next);
})

postRouter.get('/all',(req,res,next)=>{
    postController.getAll(req,res,next);
})

postRouter.get('/:id',(req,res,next)=>{
    postController.getPost(req,res,next);
})

postRouter.get('/',(req,res,next)=>{
    postController.getAllPostsOfUser(req,res,next);
})

postRouter.delete('/:id',(req,res,next)=>{
    postController.deletePost(req,res,next);
})

export default postRouter;