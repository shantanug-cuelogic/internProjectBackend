import { connection } from '../../../app';


class commentModel {

    postComment = (req, res, next) => {
        let queryString = 'INSERT INTO comments(postId,userId,commentContent)VALUES(?,?,?)';
        let values = [req.body.postId, req.body.userId, req.body.commentContent];

        connection.query(queryString, values, (err, result, feilds) => {
            if (err) {
                res.json({ success: false, message: err });
            }
        
            else {
                res.json(result);
            }
        });
    }

    getAllComments = (req, res, next) => {
        let queryString = 'SELECT users.firstName, users.lastName , comments.commentId,comments.commentContent FROM users INNER JOIN comments ON users.userId=comments.userId WHERE postId = ?';
        let values = [req.params.postId];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else if (result.length === 0) {
                res.json({success:false, message:"No comments available on this post"})
            }
            else {
                res.json({ result });
            }
        });
    }

    deleteComment = (req,res,next) => {
        let queryString = 'DELETE FROM comments WHERE commentId = ?';
        let values = [req.body.commentIdtoDelete];

        connection.query(queryString,values,(err,result,fields)=> {
            if(err) {
                res.json({success:false, message: err});
            }
            else {
                res.json(result);
            }
        })
    }

    updateComment = (req,res,next) => {
        let queryString = 'UPDATE comments SET commentContent = ? WHERE commentId = ?';
        let values = [req.body.commentContent , req.body.commentIdtoUpdate];

        connection.query(queryString,values,(err, result, fields) => {
            if(err) {
                res.json({success:false, message : err});
            }
            else {
                res.json(result)
            }
        });
    }

}

export default new commentModel();