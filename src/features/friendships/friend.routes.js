import express from 'express';
import FriendController from './friend.controller.js';

const friendsRouter=express.Router();
const friendsController=new FriendController();

friendsRouter.get('/get-friends/:id',(req,res,next)=>{
    friendsController.getFriends(req,res,next);
});

friendsRouter.get('/get-pending-requests',(req,res,next)=>{
    friendsController.getPendingRequests(req,res,next);
});

friendsRouter.get('/toggle-friendship/:id',(req,res,next)=>{
    friendsController.toggleFriendRequest(req,res,next);
});

friendsRouter.post('/response-to-request/:id',(req,res,next)=>{
    friendsController.acceptOrRejectRequest(req,res,next);
});


export default friendsRouter;