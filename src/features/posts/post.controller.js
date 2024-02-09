import PostRepository from "./post.repository.js";

export default class PostController{
    constructor(){
        this.postRepo=new PostRepository();
    }

    async addPost(req,res,next){
        try {
            const userId=req.id;
            const imageUrl=req.file.filename;
            const caption=req.body.caption;
            const result=await this.postRepo.addPost(caption,imageUrl,userId);
            res.status(201).send({
                success:true,
                message:result
            })
        } catch (error) {
            next(error);
        }
    }

    async getPost(req,res,next){
        try {
            const id=req.params.id;
            const result=await this.postRepo.getpost(id);
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

    async getAllPostsOfUser(req,res,next){
        try {
            const userId=req.id;
            const result=await this.postRepo.getAllPostsOfUser(userId);
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

    async getAll(req,res,next){
        try {
            const result=await this.postRepo.getAll();
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

    async deletePost(req,res,next){
        try {
            const userId=req.id;
            const id=req.params.id;
            const result=await this.postRepo.deletePost(id,userId);
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

    async updatePost(req,res,next){
        try {
            
            const id=req.params.id;
            const {caption} = req.body;
            const imageUrl=req.file.filename;
            console.log(imageUrl);
            const result=await this.postRepo.updatePost(id,caption,imageUrl);
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