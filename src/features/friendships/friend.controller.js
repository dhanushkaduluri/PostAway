import FriendsRepository from "./friend.repository.js";

export default class FriendController{

    constructor(){
        this.friendRepo=new FriendsRepository();
    }

    async getFriends(req,res,next){
        try {
            const userId=req.params.id;
            const result=await this.friendRepo.getFriends(userId);
            res.status(200).send(
                {
                    success:true,
                    message:result
                }
            )
        } catch (error) {
            next(error);
        }

    }

    async getPendingRequests(req,res,next){
        try {
            const userId=req.id;
            const result=await this.friendRepo.getRequests(userId);
            res.status(200).send(
                {
                    success:true,
                    message:result
                }
            )
        } catch (error) {
            next(error);
        }
    }

    async toggleFriendRequest(req,res,next){
        try {
            const userId=req.id;
            const friendId=req.params.id;
            
            const result=await this.friendRepo.toggleRequests(userId,friendId);

            res.status(200).send(
                {
                    success:true,
                    message:result
                }
            )
        } catch (error) {
            next(error);
        }
    }

    async acceptOrRejectRequest(req,res,next){
        try {
            const userId=req.id;
            const friendId=req.params.id;
            const status=req.body.status;
            let result;
            if(status=='accept'){
                result=await this.friendRepo.acceptRequest(userId,friendId);
            }else{
                result=await this.friendRepo.rejectRequest(userId,friendId);
            }

            res.status(200).send(
                {
                    success:true,
                    message:result
                }
            )
        } catch (error) {
            next(error);
        }
    }


}