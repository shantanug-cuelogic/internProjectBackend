import express from 'express';
import authenticator from '../../../Middleware/authenticationMiddleware';
import privileges from '../../../Middleware/priveleges';
import followerController from '../Controller/followerController';

let router = express.Router();

router.post('/add',authenticator.auth,followerController.addFollower);
router.put('/unfollow',authenticator.auth, followerController.unfollow);
router.post('/allowed',authenticator.auth,followerController.alreadyFollowed);

module.exports = router;
