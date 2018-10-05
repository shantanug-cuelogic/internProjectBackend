import express from 'express';
import postController from '../Controllers/postController';
import commentRoute from '../../Comments/Routes/commentRoutes';
import ratingRoute from '../../Ratings/Routes/ratingRoutes';
import likeRoute from '../../Likes/Routes/likeRoutes';
import viewRoute from '../../Views/Routes/viewRoutes';
import authenticator from '../../../Middleware/authenticationMiddleware';
import privileges from '../../../Middleware/priveleges';

let router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/getpost/:postId',postController.getPost);
router.post('/create', postController.createPost);
router.put('/savepost',postController.savepost)
router.put('/update', authenticator.auth,privileges.updatePost ,postController.updatePost);
router.get('/recent', postController.getRecentPost);
router.get('/recentupdated', postController.getRecentlyUpdatedPosts);
router.get('/mostliked',postController.getMostLikedPost);
router.get('/category/:category', postController.getCategoryPost);
router.get('/year/:year', postController.getPostByYear);
router.get('/month/:month', postController.getPostByMonth);
router.get('/day/:day', postController.getPostByDay);
router.get('/popular', postController.getPopularPost);
router.post('/delete', authenticator.auth, privileges.deletePost, postController.deletePost);
router.get('/totalcomments/:postId', postController.noofComments);
router.get('/search',postController.searchPost);
router.get('/draft/:userId',postController.getDraftPost);
router.get('/history/:postId', postController.getPostActivity);
router.get('/:userId', postController.getPostByUser);
router.use('/comment', commentRoute);
router.use('/ratings', ratingRoute);
router.use('/like',likeRoute);
router.use('/view/',viewRoute);
module.exports = router;
