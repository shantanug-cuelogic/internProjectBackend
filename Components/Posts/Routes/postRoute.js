import express from 'express';
import postController from '../Controllers/postController';
import commentRoute from '../../Comments/Routes/commentRoutes';
import ratingRoute from '../../Ratings/Routes/ratingRoutes';
import authenticator from '../../../Middleware/authenticationMiddleware';
import privileges from '../../../Middleware/priveleges';

let router = express.Router();

router.get('/', postController.getAllPosts);
router.post('/create', authenticator.auth, postController.createPost);
router.put('/update', authenticator.auth, privileges.updatePost, postController.updatePost);
router.get('/recent', postController.getRecentPost);
router.get('/recentupdated', postController.getRecentlyUpdatedPosts);
router.get('/category/:category', postController.getCategoryPost);
router.get('/year/:year', postController.getPostByYear);
router.get('/month/:month', postController.getPostByMonth);
router.get('/day/:day', postController.getPostByDay);
router.get('/popular', postController.getPopularPost);
router.post('/delete', authenticator.auth, privileges.deletePost, postController.deletePost);
router.get('/totalcomments/:postId', postController.noofComments);
router.use('/comment', commentRoute);
router.use('/ratings', ratingRoute);


module.exports = router;
