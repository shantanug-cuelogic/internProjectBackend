import { connection } from '../../../app';
import moment from 'moment';

class likeModel {

    updateLikeAndViews = (postId,req, res, next) => {
        console.log("IN UPDATE=======>");
         let queryString = "update posts set views = (select count(viewId) from views where postId = ?) , likes = (select count(likeId) from likes where postId = ?)where postId = ?;"
         let values = [postId,postId,postId];
         connection.query(queryString, values, (err, result, fields) => {
             if (err) {
                
                 console.log(err)
             }
         });
     }

    addLikeToPost = (req, res, next) => {
        let queryString = 'INSERT INTO likes (postId,userId) VALUES (?,?)';
        let values = [req.body.postIdToLike, req.body.userId];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                this.updateLikeAndViews(req.body.postIdToLike);

                let values = [req.body.userId, 3, result.insertId, moment().unix(),req.body.postIdToLike];
                connection.query("CALL addUserActivity(?,?,?,?,?)", values, (err, queryResult, field) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    }
                    else {
                        res.json({ success: true, message: "Liked the Post" });
                    }
                })

               // res.json({ success: true, message: "Liked Successfully" });
            }
        });
        
    }

    removeLikeToPost = (req, res, next) => {
        let queryString = 'DELETE FROM likes WHERE postId = ? AND userId = ?';
        let values = [req.body.postIdToUnlike, req.body.userId]

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                this.updateLikeAndViews(req.body.postIdToUnlike);
                res.json({ success: true, message: "Unliked Successfully" });
            }
        });
    }

    totalLikes = (req, res, next) => {
        let queryString = 'SELECT COUNT(likeId) as totalLikes FROM likes WHERE postId = ?';
        let values = req.params.postId;
        this.updateLikeAndViews(req.params.postId);

        connection.query(queryString, values, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {

                res.json({ success: true, message: "Successfully", count: result[0].totalLikes });
            }
    })
}
    allowedToLike = (req,res,next) => {
        let queryString = 'SELECT * FROM likes WHERE postId = ? AND userId = ?'
        let values = [req.body.postIdToLike, req.body.userId]

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                              
                if(result.length === 0) {
             
                    res.json({ success: true, message: "Allowed to like" });
                }
                else {
                    res.json({ success: false, message: "Already Liked" });;
                }
                //res.json(result.length);
            }
        })
    }    


}
export default new likeModel();