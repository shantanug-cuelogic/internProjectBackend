import express from 'express';
import userController from '../Controller/userController';
import authenticator from '../../../Middleware/authenticationMiddleware';
import privileges from '../../../Middleware/priveleges';
import followerRoute from '../../Followers/Routes/FollowerRoutes';
import feedbackRoute from '../../Feedback/Routes/FeedbackRoutes';
import messageRoute from '../../Messages/Routes/messageRoutes';
import postController from '../../Posts/Controllers/postController';

let router = express.Router();

router.post('/user/authenticate',authenticator.auth,userController.authenticateUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/user/forgotPassword', userController.forgotPassword);
router.post('/user/token', userController.checkForgetToken);
router.put('/user/changepassword',userController.changePassword);
router.get('/user/profile/:userId', userController.userProfile);
router.put('/user/update', /* authenticator.auth, privileges.updateUser,*/ userController.updateUserProfile);
router.put('/user/delete', authenticator.auth, privileges.deleteUser, userController.deleteUser);
router.get('/user/:userId/recentactivity', userController.getRecentActivity);
router.get('/user/:userId/posts/drafts',postController.getDraftPost)
router.get('/views/:userId',userController.getViewsPerPost);
router.get('/users/likes/:userId',userController.noofLikes);
router.get('/users/views/:userId',userController.noofViews);
router.get('/users/posts/:userId',userController.noofPosts);
router.get('/users/comments/:userId',userController.noofComments);
router.get('/users',userController.getAllUsers);
router.use('/followers',followerRoute);
router.use('/user/feedbacks', feedbackRoute);
router.use('/user/messages',messageRoute);
module.exports = router;
