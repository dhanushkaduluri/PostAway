import CommentRepository from "./comments.repository.js";

export default class CommentController{

    constructor(){
        this.commentRepo=new CommentRepository();
    }

    async addComment(req,res,next){
        try {
            const userId=req.id;
            const postId=req.params.id;
            const comment=req.body.comment;
            const result=await this.commentRepo.addComment(userId,postId,comment);
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

    async updateComment(req,res,next){
        try {
            const userId=req.id;
            const commentId=req.params.id;
            const updatedComment=req.body.comment;
            const result=await this.commentRepo.updateComment(commentId,userId,updatedComment);
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

    async deleteComment(req,res,next){
        try {
            const userId=req.id;
            const commentId=req.params.id;
            const result=await this.commentRepo.deleteComment(commentId,userId);
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

    async getComments(req,res,next){
        try {
            const postId=req.params.id;
            const result=await this.commentRepo.getComments(postId);
            res.status(200).send(
                {
                    success:true,
                    message:result
                }
            )
        } catch (error) {
            next(error)
        }
    }

}