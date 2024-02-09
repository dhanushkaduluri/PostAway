import express from 'express';
import CommentController from './comments.controller.js';

const commentRouter=express.Router();
const commentController=new CommentController();

commentRouter.post('/:id',(req,res,next)=>{
    commentController.addComment(req,res,next);
})

commentRouter.get('/:id',(req,res,next)=>{
    commentController.getComments(req,res,next);
})

commentRouter.put('/:id',(req,res,next)=>{
    commentController.updateComment(req,res,next);
})

commentRouter.delete('/:id',(req,res,next)=>{
    commentController.deleteComment(req,res,next);
})

export default commentRouter;