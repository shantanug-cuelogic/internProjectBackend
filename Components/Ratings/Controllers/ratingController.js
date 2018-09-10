import ratingModel from '../Models/ratingModel';

class ratingController {

    giveRating = (req,res,next) => {
        ratingModel.giveRating(req,res,next);
    }

    getRating = (req,res,next) => {
        ratingModel.getRating(req,res,next);
    }

}

export default new ratingController();