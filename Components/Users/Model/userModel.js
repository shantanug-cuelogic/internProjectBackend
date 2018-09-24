import { connection } from '../../../app';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class userModel {

    registerUser = (req, res, next,path) => {
      
        let pass = req.body.password;
        bcrypt.hash(pass, 4, (err, hash) => {
            if (err) res.json({ success: false, message: err });

            else {
                let queryString = "INSERT INTO users (firstName,lastName,passKey,email,isAdmin,securityQuestion, securityAnswer, profileImage ) VALUES (?,?,?,?,?,?,?,?)";
                let values = [req.body.firstName, req.body.lastName, hash, req.body.email, 0, req.body.securityQuestion, req.body.securityAnswer, path]
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
        let queryString = "SELECT userId, email, passKey, isAdmin  FROM users WHERE email = ?";

        return new Promise((resolve, reject) => {
            connection.query(queryString, [email], (err, queryResult) => {
            

                if (queryResult.length === 0) {
                    // res.json({ success: false, message: "User not found" });
                    res.json({ success: false, message: "User not found" })
                }
                else {

                    // res.json(queryResult);
                    resolve(queryResult);
                }
            });
        });
    }

    userProfile = (req, res, next) => {
        let queryString = 'SELECT userId , firstName , lastName , email, isAdmin , profileImage FROM users WHERE userId = ?';
        let values = req.params.userId;

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });

            }
            else if (result.length === 0) {
                res.json({ success: false, message: "User not found" });
            }
            else {
                res.json(result);
            }
        });
    }

    updateUserProfile = (req, res, next) => {
        let queryString = "UPDATE users SET firstName = ?, lastName = ? , profileImage = ? WHERE userId = ?";
        let values = [req.body.firstName, req.body.lastName, req.body.profileImage, req.body.userIdtoUpdate];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json(result);
            }
        });
    }

    deleteUser = (req, res, next) => {
        let queryString = "DELETE FROM users WHERE userId = ?";
        let values = [req.body.userIdtoDelete];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: "User deleted" });
            }
        });
    }

    noofLikes = (req,res,next) => {
        let queryString = " select SUM(likes) as likeCount from posts where userId = ? "
        let values =  req.params.userId;

        connection.query(queryString,values,(err,result,fields) => {
            if(err) {
                console.log(err)
            }
            else {
                res.json({success:true,likeCount:result[0].likeCount});
            }
        })
    }
    noofViews = (req,res,next) => {
        let queryString = " select SUM(views) as viewCount from posts where userId = ? "
        let values =  req.params.userId;

        connection.query(queryString,values,(err,result,fields) => {
            if(err) {
                console.log(err)
            }
            else {
                res.json({success:true,viewCount:result[0].viewCount});
            }
        })
    }

    noofPosts = (req,res,next) => {
        let queryString = "Select COUNT(postId) as postCount FROM posts WHERE userId = ?"
        let values =  req.params.userId;

        connection.query(queryString,values,(err,result,fields) => {
            if(err) {
                console.log(err)
            }
            else {
                res.json({success:true,postCount:result[0].postCount});
            }
        })
    }


}
export default new userModel();