import { connection } from '../../../app';
import moment from 'moment';


class commentModel {

    postComment = (req, res, next) => {
        let queryString = 'INSERT INTO comments(postId,userId,commentContent, commentTimeStamp)VALUES(?,?,?,?)';
        let values = [req.body.postId, req.body.userId, req.body.commentContent, moment().unix()];
        connection.query(queryString, values, (err, result, feilds) => {
            if (err) {
                res.json({ success: false, message: err });
            }

            else {

                let values = [req.body.userId, 1, result.insertId, moment().unix(),req.body.postId];
                connection.query("CALL addUserActivity(?,?,?,?,?)", values, (err, queryResult, field) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    }
                    else {
                        res.json({ success: true, message: "Comment Posted", insertId: result.insertId });
                    }
                })
            }
        });
    }

    getAllComments = (req, res, next) => {
        let queryString = 'SELECT users.firstName, users.lastName ,comments.userId, comments.commentId,comments.commentContent FROM users INNER JOIN comments ON users.userId=comments.userId WHERE postId = ?';
        let values = [req.params.postId];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else if (result.length === 0) {
                res.json({ success: false, message: "No comments available on this post" })
            }
            else {
                res.json({ success: true, result });
            }
        });
    }

    deleteComment = (req, res, next) => {
        let queryString = 'DELETE FROM comments WHERE commentId = ?';
        let values = [req.body.commentIdtoDelete];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: fields });
            }
        })
    }

    updateComment = (req, res, next) => {
        let queryString = 'UPDATE comments SET commentContent = ? WHERE commentId = ?';
        let values = [req.body.commentContent, req.body.commentIdtoUpdate];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json(result)
            }
        });
    }

}

export default new commentModel();