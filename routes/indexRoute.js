import express from 'express';
import indexController from '../Controllers/indexController';

let router = express.Router();

router.post('/register', indexController.registerUser);
router.post('/login', indexController.loginUser);
router.post('/forgotPassword', indexController.forgotPassword);
router.get('/userprofile/:userId', indexController.userProfile);
router.put('/updateuserprofile', indexController.updateUserProfile);
router.put('/deleteuser',indexController.deleteUser);

module.exports = router;
