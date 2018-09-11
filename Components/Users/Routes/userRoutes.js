import express from 'express';
import userController from '../Controller/userController';

let router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgotPassword', userController.forgotPassword);
router.get('/userprofile/:userId', userController.userProfile);
router.put('/updateuserprofile', userController.updateUserProfile);
router.put('/deleteuser',userController.deleteUser);

module.exports = router;
