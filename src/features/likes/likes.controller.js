import LikeRepository from "./likes.repository.js";

export default class LikeController{
    constructor(){
        this.likeRepo=new LikeRepository();
    }

    async likePost(req,res,next){
        try {
            const userId=req.id;
            const postId=req.params.id;
            const type=req.query.type;
            const result=await this.likeRepo.LikePost(userId,postId,type);
            res.status(201).send(
                {
                    success:true,
                    message:result
                }
            )
        } catch (error) {
            next(error);
        }
    }

    async getLike(req,res,next){
        try {
            const id=req.params.id;
            const type=req.body.type;
            const result=await this.likeRepo.getLikes(id,type);
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