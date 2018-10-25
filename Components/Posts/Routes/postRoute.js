import express from 'express';
import postController from '../Controllers/postController';
import commentRoute from '../../Comments/Routes/commentRoutes';
import ratingRoute from '../../Ratings/Routes/ratingRoutes';
import likeRoute from '../../Likes/Routes/likeRoutes';
import viewRoute from '../../Views/Routes/viewRoutes';
import authenticator from '../../../Middleware/authenticationMiddleware';
import privileges from '../../../Middleware/priveleges';
import commentController from '../../Comments/Controllers/commentController';
import ratingController from '../../Ratings/Controllers/ratingController';
import likeController from '../../Likes/Controller/likeController';
import viewController from '../../Views/Controller/viewController';

let router = express.Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.put('/savepost',postController.savepost)
router.put('/', authenticator.auth,privileges.updatePost ,postController.updatePost);
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
router.get('/:userId/draft/',postController.getDraftPost);
router.get('/:postId/history', postController.getPostActivity);

router.use('/:postId/comments', commentController.getAllComments);
router.use('/comments', commentRoute);
router.get('/:postId/ratings', ratingController.getRating);

router.use('/ratings', ratingRoute);

router.use('/likes',likeRoute);
router.get('/:postId/likes',likeController.totalLikes);

router.use('/views/',viewRoute);
router.get('/:postId/views/',viewController.totalViewToPost);
module.exports = router;
