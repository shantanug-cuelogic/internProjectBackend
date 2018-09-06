import express from 'express';
import postController from '../Controllers/postController';

let router = express.Router();

router.get('/',postController.getAllPosts);
router.post('/create', postController.createPost);
router.get('/recent', postController.getRecentPost);
router.post('/category', postController.getCategoryPost);
router.get('/popular', postController.getPopularPost);


module.exports = router;
