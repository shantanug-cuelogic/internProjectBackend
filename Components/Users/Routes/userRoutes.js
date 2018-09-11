import express from 'express';
import userController from '../Controller/userController';
import authenticator from '../../../Middleware/authenticationMiddleware';
import privileges from '../../../Middleware/priveleges';

let router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgotPassword', userController.forgotPassword);
router.get('/userprofile/:userId', userController.userProfile);
router.put('/updateuserprofile', authenticator.auth, privileges.updateUser, userController.updateUserProfile);
router.put('/deleteuser', authenticator.auth, privileges.deleteUser, userController.deleteUser);

module.exports = router;
