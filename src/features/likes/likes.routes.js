import express from 'express';
import LikeController from './likes.controller.js';

const likeRouter=express.Router();
const likeController=new LikeController();

likeRouter.get('/:id',(req,res,next)=>{
    likeController.getLike(req,res,next);
})

likeRouter.get('/toggle/:id',(req,res,next)=>{
    likeController.likePost(req,res,next);
})



export default likeRouter;