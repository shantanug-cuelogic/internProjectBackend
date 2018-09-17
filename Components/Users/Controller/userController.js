import { connection } from '../../../app'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../Model/userModel';

require('dotenv').config();

class UserControllers {

    registerUser = (req, res, next) => {
        userModel.registerUser(req, res, next);
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

}
export default new UserControllers();