import express from 'express';
import authenticator from '../../../Middleware/authenticationMiddleware';
import viewController from '../Controller/viewController';

let router = express.Router();

router.post('/add',authenticator.auth,viewController.addViewToPost);
router.get('/totalviews/:postId',viewController.totalViewToPost);

module.exports = router;