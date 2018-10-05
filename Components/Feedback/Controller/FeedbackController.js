import feedbackModel from '../Model/FeedbackModel';

class FeedbackController {
    sendFeedBack = (req,res,next) => {
        feedbackModel.sendFeedBack(req,res,next);
    }

    showFeedback = (req,res,next) => {
        feedbackModel.showFeedback(req,res,next);
    }

}

export default new FeedbackController();
