import express from 'express';
import commentController from '../Controllers/commentController';
import authenticator from '../../../Middleware/authenticationMiddleware';
import priveleges from '../../../Middleware/priveleges';

const router = express.Router();


router.get('/:postId', commentController.getAllComments);
router.put('/', authenticator.auth, commentController.postComment);
router.put('/delete', authenticator.auth, priveleges.deleteComment, commentController.deleteComment);
router.put('/update', authenticator.auth, priveleges.updateComment, commentController.updateComment);



module.exports = router;

