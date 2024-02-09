// Better error handling for better user experience 

export default class ApplicationError extends Error{
    constructor(code,message){
        super(message);
        this.code=code;
    }
};

export const ApplicationLevelErrorHandler=(err,req,res,next)=>{
    console.log(err);
    err.code = err.code || 500;
    err.message = err.message || "server error! Try later!!";
    res.status(err.code).json({ success: false, error: err.message });
    next();
}