import express from 'express';
import userController from '../Controllers/userController';

var router = express.Router();

/* GET home page. */
router.post('/register', userController.registerUser );
router.post('/login',);

module.exports = router;
