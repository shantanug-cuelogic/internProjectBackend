import { connection } from '../../../app';
import moment from 'moment';

class postModel {
    createPost = (req, res, next) => {
        let timeStamp = moment().unix();
        let queryString = "INSERT INTO posts(userId,title,postTimestamp,postContent,category,views,likes,postDate) VALUES (?,?,?,?,?,?,?,?)";
        let values = [req.body.userId, req.body.title, timeStamp, req.body.postContent, req.body.category, 0, ' ', moment().format('M/D/YYYY')];
        connection.query(queryString, values, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: "Post created successfully" });
            }
        });
    }

    updatePost = (req, res, next) => {
        let queryString = 'UPDATE posts SET title =? , postContent = ?, category = ? , updateDate = ? , updateTimeStamp = ? WHERE postId = ?';
        let values = [req.body.title, req.body.postContent, req.body.category, moment().format('M/D/YYYY'), moment().unix(), req.body.postId];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ result });
            }
        });
    }

    getRecentPost = (req, res, next) => {
        let queryString = "SELECT * FROM posts ORDER BY postTimeStamp DESC";
        connection.query(queryString, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ result });
            }
        });
    }

    getRecentUpdatedPost = (req, res, next) => {
        let queryString = "SELECT * FROM posts ORDER BY updateTimeStamp DESC";
        connection.query(queryString, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ result });
            }
        });
    }

    getCategoryPost = (req, res, next) => {
        console.log("===>", req.params.category);
        let queryString = "SELECT * FROM posts WHERE category = ?";
        connection.query(queryString, req.params.category, (err, result, field) => {
            if (result.length === 0) {
                res.json({ success: false, message: "No post avavilable of this category" });
            }
            else {
                res.json({ result });
            }
        });
    }

    getPopularPost = (req, res, next) => {
        let queryString = "SELECT * FROM posts ORDER BY views DESC";
        connection.query(queryString, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ result });
            }
        });
    }

    getAllPosts = (req, res, next) => {
        let queryString = "SELECT * FROM posts";
        connection.query(queryString, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ result })
            }
        })
    }

    getPostsByYear = (req, res, next) => {
        let queryString = "SELECT * FROM posts WHERE postDate LIKE ?";
        let values = ['%' + req.params.year];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else if (result.length === 0) {
                res.json({ success: false, message: "No Post found!! Try some other filter" });
            }
            else {
                res.json(result);
            }
        });
    }

    getPostsByMonth = (req, res, next) => {
        let queryString = "SELECT * FROM posts WHERE postDate LIKE ?";
        let values = [req.params.month + '%'];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else if (result.length === 0) {
                res.json({ success: false, message: "No Post found!! Try some other filter" });
            }
            else {
                res.json(result);
            }
        });
    }

    getPostsByDay = (req, res, next) => {
        let queryString = "SELECT * FROM posts WHERE postDate LIKE ?";
        let values = ['%/' + req.params.day + '/%'];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else if (result.length === 0) {
                res.json({ success: false, message: "No Post found!! Try some other filter" });
            }
            else {
                res.json(result);
            }
        });
    }

    deletePost = (req, res, next) => {
        let queryString = "DELETE FROM comments WHERE postId = ? ";
        let values = [req.body.postId];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                let innerQueryString = "DELETE FROM posts WHERE postId = ?";
                connection.query(innerQueryString, values, (error, inerQueryResult, innerQueryFields) => {
                    if(error) {
                        res.json({ success: false, message: err });
                    }
                    else {
                        res.json(inerQueryResult);
                    }
                });
            }
        });
    }

    noofComments = (req,res,next) => {
        let queryString = 'SELECT COUNT(commentId) AS Count FROM comments INNER JOIN posts ON posts.postId = comments.postId WHERE comments.postId = ?';
        let values = [req.params.postId];

        connection.query(queryString,values,(err,result,fields) => {
            if(err) {
                res.json({success:false,message:err});
            }
            else {
                res.json(result);
            }
        });
    }
}



export default new postModel();