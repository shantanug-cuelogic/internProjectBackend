import express from 'express';
import authenticator from '../../../Middleware/authenticationMiddleware';
import privileges from '../../../Middleware/priveleges';
import followerController from '../Controller/followerController';
import userController from '../../Users/Controller/userController';

let router = express.Router();

router.get('/:userId', userController.getFollowerInfo);
router.post('/add',authenticator.auth,followerController.addFollower);
router.put('/unfollow',authenticator.auth, followerController.unfollow);
router.post('/allowed',authenticator.auth,followerController.alreadyFollowed);

module.exports = router;
