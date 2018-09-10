
import commentModel from '../Models/commentModel';

class commentController {

    postComment = (req,res,next) => {
        commentModel.postComment(req,res,next);
    }

    getAllComments = (req,res,next) => {
        commentModel.getAllComments(req,res,next);
    }

    deleteComment = (req,res,next) => {
        commentModel.deleteComment(req,res,next);
    }

    updateComment =(req,res,next) => {
        commentModel.updateComment(req,res,next);
    }

}


export default new commentController();