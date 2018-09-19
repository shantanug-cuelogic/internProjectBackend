import likeModel from '../Model/likeModel';

class likeController {
    addLikeToPost=(req,res,next) => {
        likeModel.addLikeToPost(req,res,next);
    }

    removeLikeToPost = (req,res,next) => {
        likeModel.removeLikeToPost(req,res,next);
    }

    totalLikes = (req,res,next) => {
        likeModel.totalLikes(req,res,next);
    }
}   
export default new likeController();