import express from 'express';
import indexController from '../Controllers/indexController';
var multer = require('multer');

let router = express.Router();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + ".jpg" )
    }
});
var upload = multer({storage: storage}).single('file_name');


router.post('/register', indexController.registerUser );
router.post('/login',indexController.loginUser);
router.post('/forgotPassword',indexController.forgotPassword);
router.put('/fileupload',indexController.fileUpload);
router.post('/imageupload',(req,res,next) => {
   
    upload(req,res,(err) =>{
       
        if(err){
            console.log("===> in callback");
            console.log(err);
            res.json(err);
        } else {
            
            console.log(req.file.filename);
            res.json({"link" : req.file.filename});
        }
    })

    
    
});

module.exports = router;
