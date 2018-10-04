import { connection } from '../../../app';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class userModel {


    


    registerUser = (req, res, next, path) => {

        let pass = req.body.password;
        bcrypt.hash(pass, 4, (err, hash) => {
            if (err) res.json({ success: false, message: err });

            else {
                let queryString = "INSERT INTO users (firstName,lastName,passKey,email,isAdmin,securityQuestion, securityAnswer, profileImage, followers ) VALUES (?,?,?,?,?,?,?,?,?)";
                let values = [req.body.firstName, req.body.lastName, hash, req.body.email, 0, /*req.body.securityQuestion*/"xyz", /*req.body.securityAnswer*/ "xyz", path, 0]
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

    changePassword = (req, res, next) => {
        let queryString = " UPDATE users SET passKey = ? WHERE userId = ?";

        bcrypt.hash(req.body.password, 4, (error, hash) => {
            if (error) {
                res.json({ success: false, message: "Password Update Failed Please Try Again Later" });

            }
            else {
                let values = [hash, req.body.userId];
                connection.query(queryString, values, (err, result) => {
                    if (err) {
                        res.json({ success: false, message: "Password Update Failed Please Try Again Later" });
                    }
                    else {
                        res.json({ success: true, message: "Password Changed !!" });
                    }
                })
            }

        });
    }

    authenticateUser = (req,res,next) => {

        let email = req.body.email;
        let queryString = "SELECT userId, email, isAdmin , followers, firstName , lastName, profileImage,gender  FROM users WHERE email = ?";

        
            connection.query(queryString, [email], (err, queryResult) => {


                if (queryResult.length === 0) {
                    res.json({ success: false, message: "User not found" })
                }
                else {

                   res.json({success:true , result: queryResult[0]});
                }
            });
        
    }

    loginUser = (req, res, next) => {

        let email = req.body.email;
        let queryString = "SELECT userId, email, passKey, isAdmin , followers, firstName , lastName, profileImage,gender  FROM users WHERE email = ?";

        return new Promise((resolve, reject) => {
            connection.query(queryString, [email], (err, queryResult) => {


                if (queryResult.length === 0) {
                    res.json({ success: false, message: "User not found" })
                }
                else {

                    resolve(queryResult);
                }
            });
        });
    }

    searchUser = (req, res, next) => {
        let queryString = " SELECT userId , firstName FROM users WHERE email = ? ";
        let email = req.body.email;

        return new Promise((resolve, reject) => {
            connection.query(queryString, [email], (err, queryResult) => {


                if (queryResult.length === 0) {

                    res.json({ success: false, message: "Username Does not exist" })
                }
                else {

                    resolve(queryResult);
                }
            });
        });

    }

    storeForgetPasswordToken = (req, res, next, userId, token) => {
        let queryString = "UPDATE users SET forgetPasswordToken = ? WHERE userId = ?";
        let values = [token, userId];
        connection.query(queryString, values, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: "Some Error Occured Please Try Again Later" });
            }
            else {
                res.json({ success: true, message: "Link Sent To email" })

            }
        })
    }

    checkForgetPasswordToken = (req, res, next) => {

        let queryString = "SELECT firstName , lastName, userId  FROM users WHERE forgetPasswordToken = ?";
        let values = req.body.forgetToken;
        connection.query(queryString, [values], (err, queryResult) => {
            if (queryResult.length === 0) {
                res.json({ success: false, message: "User not found" })
            }
            else {
                res.json({ success: true, result: queryResult })
            }
        });

    }


    userProfile = (req, res, next) => {
        let queryString = 'SELECT userId , firstName , lastName , email, isAdmin , profileImage, gender FROM users WHERE userId = ?';
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

    updateUserProfile = (req, res, next, profileImage) => {
        let queryString = "UPDATE users SET firstName = ?, lastName = ? , profileImage = ? , gender = ? WHERE userId = ?";
        let values = [req.body.firstName, req.body.lastName, profileImage, req.body.gender, req.body.userIdtoUpdate];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: "Updated Succesfully", profileImagePath: profileImage });
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

    noofLikes = (req, res, next) => {
        let queryString = " select SUM(likes) as likeCount from posts where userId = ? "
        let values = req.params.userId;

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                console.log(err)
            }
            else if (result[0].likeCount === null) {
                res.json({ success: false, likeCount: 0 });
            }
            else {
                res.json({ success: true, likeCount: result[0].likeCount });
            }
        })
    }
    noofViews = (req, res, next) => {
        let queryString = " select SUM(views) as viewCount from posts where userId = ? "
        let values = req.params.userId;

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                console.log(err)
            }
            else if (result[0].viewCount === null) {
                res.json({ success: false, viewCount: 0 });
            }
            else {
                res.json({ success: true, viewCount: result[0].viewCount });
            }
        })
    }

    noofPosts = (req, res, next) => {
        let queryString = "Select COUNT(postId) as postCount FROM posts WHERE userId = ?"
        let values = req.params.userId;

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                console.log(err)
            }
            else {
                res.json({ success: true, postCount: result[0].postCount });
            }
        })
    }
    noofComments = (req, res, next) => {
        let queryString = " select count(comments.commentId) as commentCount from comments  inner join posts on comments.postId=posts.postId where posts.userId= ?"
        let values = req.params.userId;

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                console.log(err)
            }
            else {
                res.json({ success: true, commentCount: result[0].commentCount });
            }
        })
    }

    getRecentActivity = (req, res, next) => {
        let queryString = "CALL GetRecentActivity( ? )";
        let values = req.params.userId;

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else if (result[0].length === 0) {
                res.json({ success: false, message: "No recent activity to show" });
            }
            else {
                res.json({ success: true, result: result[0] });
            }
        })
    }
    getViewsPerPost = (req,res,next) => {
        let queryString = 'SELECT posts.title , posts.views, posts.postId FROM posts WHERE userId = ?'
        let values = [ req.params.userId];
        connection.query(queryString,values,(err,result,field)=>{
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, result:result });
            }
        });
    }

    getFollowerInfo = (req,res,next) => {
        let queryString = "SELECT users.firstName , followerData.followTimeStamp FROM users INNER JOIN followerData ON users.userId = followerData.followerId WHERE followerData.userId = ? ";
        let values = [ req.params.userId];
        connection.query(queryString,values,(err,result,field)=>{
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, result:result });
            }
        });
    }

    getAllusers = (req,res,next) => {
        let queryString = " SELECT userId , firstName, LastName, profileImage FROM users";
        connection.query(queryString,(err,result,field)=>{
            if(err) {
                res.json({success:false , message:err});
            }
            else {
                res.json({success:true, result:result});
            }
        })
    }
    


}
export default new userModel();