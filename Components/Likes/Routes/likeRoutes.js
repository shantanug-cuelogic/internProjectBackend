import express from 'express';
import likeController from '../Controller/likeController';
import authenticator from '../../../Middleware/authenticationMiddleware';

let router = express.Router();

router.post('/add',authenticator.auth,likeController.addLikeToPost);
router.put('/remove',authenticator.auth,likeController.removeLikeToPost);
router.get('/totallikes/:postId',likeController.totalLikes);
router.post('/allowed',authenticator.auth,likeController.allowedToLike);




module.exports = router;
