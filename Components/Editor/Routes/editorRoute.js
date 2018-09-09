import express from 'express';
import editorController from '../Controllers/editorController';

let router = express.Router();

router.post('/fileupload',editorController.fileUpload);
router.post('/imageupload',editorController.imageUpload);
router.post('/videoupload',editorController.videoUpload);

module.exports = router;