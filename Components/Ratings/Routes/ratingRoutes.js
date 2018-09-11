import express from 'express';
import ratingController from '../Controllers/ratingController';
import authenticator from '../../../Middleware/authenticationMiddleware';

const router = express.Router();

router.get('/:postId', ratingController.getRating);
router.put('/', authenticator.auth,ratingController.giveRating);


module.exports = router;



