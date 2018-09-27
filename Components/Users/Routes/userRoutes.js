import express from 'express';
import userController from '../Controller/userController';
import authenticator from '../../../Middleware/authenticationMiddleware';
import privileges from '../../../Middleware/priveleges';

let router = express.Router();

router.post('/authenticate',authenticator.auth,userController.authenticateUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/checkforgettoken', userController.checkForgetToken);
router.put('/changepassword',userController.changePassword);
router.get('/userprofile/:userId', userController.userProfile);
router.put('/updateuserprofile', /* authenticator.auth, privileges.updateUser,*/ userController.updateUserProfile);
router.put('/deleteuser', authenticator.auth, privileges.deleteUser, userController.deleteUser);
router.get('/totallikes/:userId',userController.noofLikes);
router.get('/totalviews/:userId',userController.noofViews);
router.get('/totalposts/:userId',userController.noofPosts);
router.get('/totalcomments/:userId',userController.noofComments);
module.exports = router;
