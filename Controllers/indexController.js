import { connection } from '../app';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

require('dotenv').config();

class UserControllers {

    registerUser = (req, res, next) => {

        let pass = req.body.password;
        bcrypt.hash(pass, 4, (err, hash) => {
            if (err) res.json({ success: false, message: err });

            else {
                let queryString = "INSERT INTO users (firstName,lastName,passKey,email,isAdmin,followers,securityQuestion, securityAnswer) VALUES (?,?,?,?,?,?,?,?)";
                let values = [req.body.firstName, req.body.lastName, hash, req.body.email, req.body.isAdmin, req.body.followers, req.body.securityQuestion, req.body.securityAnswer]
                connection.query(queryString, values, (error, results, fields) => {
                    if (error) {
                        res.json({ success: false, message: error });
                    }
                    else {
                        res.json({ success: true });
                    }
                });
            }
        });
    }

    loginUser = (req, res, next) => {
        let email = req.body.email;
        let queryString = "SELECT userid, email, passKey FROM users WHERE email = ?";
        connection.query(queryString, [email], (err, queryResult) => {
            if (queryResult.length === 0) {
                res.json({ success: false, message: "User not found" });
            }
            else {
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
                if(req.body.answer === queryResult[0].securityAnswer) {
                    res.json({success:true, message:"Allowed to change the password"});
                }
                else{
                    res.json({success:false , message:"Incorrect Answer"});
                }
            }

        });

    }
}
export default new UserControllers();