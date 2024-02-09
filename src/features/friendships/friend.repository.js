import mongoose from 'mongoose';
import { friendShema } from './friendshipSchemas/friends.schema.js';
import { friendRequestSchema } from './friendshipSchemas/friendRequests.schema.js';
import { ObjectId } from 'mongodb';
import ApplicationError from '../../middlewares/errorHandler.middleware.js';

const FriendshipModel=mongoose.model('Friends',friendShema);

const RequestModel=mongoose.model('Requests',friendRequestSchema);

export default class FriendsRepository{

    async getFriends(userId){
        try {
            const friends=await FriendshipModel.find({user:new ObjectId(userId)})
            .populate(
                {
                    path: 'friendId',
                    select: 'name gender email -_id', 
                }
            ).select(
                {
                    name:1,
                    gender:1,
                    email:1,
                    _id:0
                }
            );
            if(!friends){
                throw new ApplicationError(400,"You don't have any friends yet!");
            }
            return friends
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getRequests(userId){
        try {
            const Requests = await RequestModel.find({ friendId: new ObjectId(userId) })
            .populate({
                path: 'userId',
                select: 'name gender email -_id', // Exclude _id if you don't want it
            })
            .select({
                name: 1,
                gender: 1,
                email: 1,
                _id: 0, // Exclude _id if you don't want it
            });

            if(!Requests[0]){
                throw new ApplicationError(400,"You don't have any Requests yet!");
            }
            return Requests;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async toggleRequests(userId,friendId){
        try {
            const user=await RequestModel.findOne(
                {
                    user:new ObjectId(userId),
                    friendId:new ObjectId(friendId)
                }
            );
            let result;
            if(!user){
                result=new RequestModel(
                    {
                        user:new ObjectId(userId),
                        friendId:new ObjectId(friendId)
                    }
                )
                await result.save();
            }else{
                result=await RequestModel.deleteOne(
                    {
                        user:new ObjectId(userId),
                        friendId:new ObjectId(friendId)
                    }
                );
            }
            return result;

        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }


    async acceptRequest(userId,friendId){
        try {
            const request=await RequestModel.deleteOne(
                {
                    user:new ObjectId(friendId),
                    friendId:new ObjectId(userId)
                }
            );
            console.log(request);
            if(request.deletedCount==0){
                throw new ApplicationError('400',"Request not found")
            }

            const friend=new FriendshipModel(
                {
                    user:new ObjectId(userId),
                    friendId:new ObjectId(friendId)
                }
            );
            await friend.save();
            return friend;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async rejectRequest(userId,friendId){
        try {
            const request=await RequestModel.deleteOne(
                {
                    user:new ObjectId(friendId),
                    friendId:new ObjectId(userId)
                }
            );
            if(!request){
                throw new ApplicationError('400',"Request not found")
            }
            return request;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


}