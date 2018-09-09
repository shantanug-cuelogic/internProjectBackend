
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';

require('dotenv').config();




class editorController {

    imageUpload = (req,res,next) => {
        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
              cb(null, 'public/')
            },
            filename: (req, file, cb) => {
              cb(null, file.fieldname + '-' + Date.now() + ".jpg" )
            }
        });
        var upload = multer({storage: storage}).single('file_name');

        upload(req,res,(err) =>{
       
            if(err){
                res.json(err);
            } else {
                res.json({"link" : req.file.filename});
            }
        })
    }

    fileUpload = (req,res,next) => {
        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
              cb(null, 'public/')
            },
            filename: (req, file, cb) => {
              cb(null, file.fieldname + '-' + Date.now()  )
            }
        });
        var upload = multer({storage: storage}).single('file_name');

        upload(req,res,(err) =>{
       
            if(err){
                res.json(err);
            } else {
                res.json({"link" : req.file.filename});
            }
        })
    }
    videoUpload = (req,res,next) => {
        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
              cb(null, 'public/')
            },
            filename: (req, file, cb) => {
              cb(null, file.fieldname + '-' + Date.now() + ".jpg" )
            }
        });
        var upload = multer({storage: storage}).single('file_name');

        upload(req,res,(err) =>{
       
            if(err){
                res.json(err);
            } else {
                res.json({"link" : req.file.filename});
            }
        })
    }


}

export default new editorController();

