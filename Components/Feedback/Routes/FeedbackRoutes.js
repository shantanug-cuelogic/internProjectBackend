import express from 'express';
import authenticator from '../../../Middleware/authenticationMiddleware';
import privileges from '../../../Middleware/priveleges';
import feedbackController from '../Controller/FeedbackController';

let router = express.Router();

router.post('/', authenticator.auth , feedbackController.sendFeedBack);
router.get('/:authorId', feedbackController.showFeedback);


module.exports = router;
