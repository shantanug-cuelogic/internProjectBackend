import express from 'express';

import commentController from '../Controllers/commentController';

const router = express.Router();


router.get('/:postId', commentController.getAllComments);
router.put('/', commentController.postComment);
router.put('/delete',commentController.deleteComment);
router.put('/update', commentController.updateComment);



module.exports = router;

