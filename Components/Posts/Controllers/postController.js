import postModel from '../Models/postModel';

class postController {
    createPost = (req, res, next) => {
        postModel.createPost(req,res,next);
    }

    getRecentPost =(req,res,next) => {
        postModel.getRecentPost(req,res,next);
    }

    getCategoryPost = (req,res,next) => {
        postModel.getCategoryPost(req,res,next);
    }

    getPopularPost = (req,res,next) => {
        postModel.getPopularPost(req,res,next);
    }

    getAllPosts = (req,res,next) => {
        postModel.getAllPosts(req,res,next);
    }
}

export default new postController();