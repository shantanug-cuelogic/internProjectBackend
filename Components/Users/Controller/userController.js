import { connection } from '../../../app'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../Model/userModel';
import multer from 'multer';

require('dotenv').config();

class UserControllers {

    registerUser = (req, res, next) => {

      
        // var storage = multer.diskStorage({
        //     destination: (req, file, cb) => {
        //       cb(null, 'public/profilePicture')
        //     },
        //     filename: (req, file, cb) => {
        //       cb(null, file.fieldname + '-' + Date.now() + ".jpg" )
        //     }
        // });
        // var upload = multer({storage: storage}).single('file');

        // upload(req,res,(err) =>{
            
        //     if(err){
                
        //         res.json(err);
        //     } else {
                
        //         let profilePicturePath = /profilePicture/+req.file.filename;
              
        //         userModel.registerUser(req, res, next,profilePicturePath);             
        //       //  console.log("===>",req);
        //     }
        // })
       // userModel.registerUser(req, res, next,'xyz');

    //    console.log("=========================>",req.formdata);

    userModel.registerUser(req, res, next,'/require/userimage.jpg'); 
    }

    authenticateUser = (req,res,next) =>{
        res.json({success:true});
    }

    loginUser = async (req, res, next) => {
        let queryResult = await userModel.loginUser(req, res, next);
        console.log("in login===>",queryResult[0]);
        bcrypt.compare(req.body.password, queryResult[0].passKey, (err, result) => {
            if (result) {
                jwt.sign({
                    userId: queryResult[0].userId,
                    email: queryResult[0].email,
                    isAdmin : queryResult[0].isAdmin
                }, process.env.SECRETKEY, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    }
                    else {
                        res.json({
                            success: true,
                            message: "Successfully Logged in",
                            authToken: token,
                            userId : queryResult[0].userId

                        });
                    }
                });
            }
            else {
                res.json({ success: false, message: "Password is incorrect" });
            }
        });
    }

    forgotPassword = (req, res, next) => {
        let email = req.body.email;
        let queryString = "SELECT userid, email,securityQuestion,securityAnswer FROM users WHERE email = ?";
        connection.query(queryString, [email], (err, queryResult) => {
            if (queryResult.length === 0) {
                res.json({ success: false, message: "User Not found" });
            }
            else {
                if (req.body.answer === queryResult[0].securityAnswer) {
                    res.json({ success: true, message: "Allowed to change the password" });
                }
                else {
                    res.json({ success: false, message: "Incorrect Answer" });
                }
            }
        });
    }

    userProfile = (req, res, next) => {
        userModel.userProfile(req, res, next);
    }

    updateUserProfile = (req, res, next) => {
        userModel.updateUserProfile(req, res, next);
    }

    deleteUser = (req, res, next) => {
        userModel.deleteUser(req, res, next);
    }
    noofLikes = (req,res,next) => {
        userModel.noofLikes(req,res,next);
    }
    noofViews = (req,res,next) => {
        userModel.noofViews(req,res,next);
    }
    noofPosts = (req,res,next) => {
        userModel.noofPosts(req,res,next);
    }
    noofComments = (req,res,next) => {
        userModel.noofComments(req,res,next);
    }

}
export default new UserControllers();