import express from 'express';
import postController from '../Controllers/postController';
import commentRoute from '../../Comments/Routes/commentRoutes';
import ratingRoute from '../../Ratings/Routes/ratingRoutes';

let router = express.Router();

router.get('/',postController.getAllPosts);
router.post('/create', postController.createPost);
router.get('/recent', postController.getRecentPost);
router.post('/category', postController.getCategoryPost);
router.get('/popular', postController.getPopularPost);
router.use('/comment',commentRoute);
router.use('/ratings',ratingRoute);


module.exports = router;
