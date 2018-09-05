import express from 'express';
import indexController from '../Controllers/indexController';

let router = express.Router();

router.post('/register', indexController.registerUser );
router.post('/login',indexController.loginUser);
router.post('/forgotPassword',indexController.forgotPassword);

module.exports = router;
