import express from 'express';
import ratingController from '../Controllers/ratingController';

const router = express.Router();

router.get('/:postId', ratingController.getRating);
router.put('/', ratingController.giveRating);


module.exports = router;



