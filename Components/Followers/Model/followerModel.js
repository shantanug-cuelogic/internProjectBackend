import { connection } from '../../../app';
import moment from 'moment';

class FollowerModel {

    addFollower = async (req, res, next) => {

        let allowed = await this.checkifExist(req.body.userId, req.body.userIdToFollow);
        if (allowed === false) {
            res.json({success:false, message:" Already following"});
        }
        else if (allowed === true) {
            let queryString = "CALL addFollower(?,?,?)";
            let values = [req.body.userIdToFollow, req.body.userId, moment().unix()];

            connection.query(queryString, values, (err, result, field) => {
                if (err) {
                    res.json({ success: false, message: err })
                }
                else {
                    let innerQueryString = "SELECT firstName FROM users WHERE userId = ?";
                    let innerValue = [req.body.userIdToFollow];
                    connection.query(innerQueryString, innerValue, (err, innerresult, fields) => {
                        if (err) {
                            res.json({ success: false, message: err })
                        }
                        else {

                            res.json({ success: true, message: `Followed ${innerresult[0].firstName} Succesfully` })
                        }
                    });
                }
            });
        }

    }

    unfollow = async (req, res, next) => {
        console.log(req.body);
        let allowed = await this.checkifExist(req.body.userId,req.body.userIdToUnfollow);
        
      if(allowed === false) {
        let queryString = "CALL unfollow(?,?)";
        let values = [req.body.userIdToUnfollow, req.body.userId];

        connection.query(queryString, values, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                let innerQueryString = "SELECT firstName FROM users WHERE userId = ?";
                let innerValue = [req.body.userIdToUnfollow];
                connection.query(innerQueryString, innerValue, (err, innerresult, fields) => {
                    if (err) {
                        res.json({ success: false, message: err })
                    }
                    else {
                        res.json({ success: true, message: `Unfollowed ${innerresult[0].firstName} Succesfully` })
                    }
                });
            }
        })
      }
      else {
          res.json({success:false, message:"You have not followed the user"})
      }
        
    }

    checkifExist = (currentUserId, userIdToCheck) => {

        let queryString = "SELECT * FROM followerData WHERE userId = ? and followerId = ?";
        let values = [userIdToCheck, currentUserId];

        return new Promise((resolve, reject) => {
            connection.query(queryString, values, (err, queryResult) => {


                if (err) {
                console.log(error)
                }

                else if (queryResult.length === 0) {
                    resolve(true);

                }

                else {
                    resolve(false)
                }
            });
        });

    }

    alreadyFollowed = (req,res,next) => {

        let queryString = "SELECT * FROM followerData WHERE userId = ? and followerId = ?";
        let values = [req.body.userIdToFollow, req.body.userId];
            connection.query(queryString, values, (err, queryResult) => {

                if (err) {
                    res.json({success:false , message: err});
                }

                else if (queryResult.length === 0) {
                    res.json({success:true, message:"Allowed To follow"})
                }

                else {
                    res.json({success:false, message: " Already Followed"})
                }
            });
        }
}

export default new FollowerModel();