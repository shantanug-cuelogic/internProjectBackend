import { connection } from '../app';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
var multer = require('multer');

require('dotenv').config();




class UserControllers {

    registerUser = (req, res, next) => {
        userModel.registerUser(req, res, next);
    }

    loginUser = async (req, res, next) => {
        let queryResult = await userModel.loginUser(req, res, next)
        bcrypt.compare(req.body.password, queryResult[0].passKey, (err, result) => {
            if (result) {
                jwt.sign({
                    userId: queryResult[0].userId,
                    email: queryResult[0].email
                }, process.env.SECRETKEY, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    }
                    else {
                        res.json({
                            success: true,
                            message: "Successfully Logged in",
                            authToken: token
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

      fileUpload = (req,res,next) => {
          console.log("===> Put method file")
            console.log(req.body);
      }

      imageUpload = (req,res,next) => {
        console.log("===> Put method image")
          console.log("===> upload file",req);
          res.json({ "link": "path/to/image.jpg" })
    }
}
export default new UserControllers();