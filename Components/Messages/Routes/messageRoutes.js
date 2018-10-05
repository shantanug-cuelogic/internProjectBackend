import express from 'express';
import messageController from '../Controller/messageController';
import authenticator from '../../../Middleware/authenticationMiddleware';
import privileges from '../../../Middleware/priveleges';

let router = express.Router();

router.post('/', authenticator.auth, messageController.sendMessage);
router.get('/:authorId', messageController.showMessages);
module.exports = router;
