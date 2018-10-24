import { connection } from '../../../app';
import moment from 'moment';

class postModel {
    // createPost = (req, res, next,thumbnail) => {
    //     let timeStamp = moment().unix();
    //     let queryString = "INSERT INTO posts(userId,title,postTimestamp,postContent,category,views,likes,postDate,thumbnail,isDraft) VALUES (?,?,?,?,?,?,?,?,?,?)";
    //     let values = [req.body.userId, req.body.title, timeStamp, req.body.postContent, req.body.category, 0, ' ', moment().format('M/D/YYYY'),thumbnail, req.body.isDraft];
    //     connection.query(queryString, values, (err, result, field) => {
    //         if (err) {
    //             res.json({ success: false, message: err });
    //         }
    //         else {

    //             let values = [req.body.userId, 2, result.insertId, moment().unix(),result.insertId];
    //             connection.query("CALL addUserActivity(?,?,?,?,?)", values, (err, queryResult, field) => {
    //                 if (err) {
    //                     res.json({ success: false, message: err });
    //                 }
    //                 else {
    //                     res.json({ success: true, message: "Post created successfully" , id: result.insertId });
    //                 }
    //             });
    //         }
    //     });
    // }

    createPost = (req, res, next, thumbnail) => {
        let timeStamp = moment().unix();
        let queryString = "CALL POST_BLOG(?,?,?,?,?,?,?,?)";
        let values = [req.body.userId, req.body.title, timeStamp, req.body.postContent, req.body.category, moment().format('M/D/YYYY'), thumbnail, req.body.isDraft];
        connection.query(queryString, values, (err, result) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                let postIdReturned = JSON.stringify(result[0]);
                let postIdContent = postIdReturned.split(":");
                let postId = postIdContent[1].split("}")
                res.json({ success: true, message: "Post created successfully", id: postId[0] });

            }
        });
    }

    savePostAsDraft = (req, res, next, thumbnail) => {
        let timeStamp = moment().unix();
        let queryString = "INSERT INTO posts(userId,title,postTimestamp,postContent,category,views,likes,postDate,thumbnail,isDraft) VALUES (?,?,?,?,?,?,?,?,?,?)";
        let values = [req.body.userId, req.body.title, timeStamp, req.body.postContent, req.body.category, 0, ' ', moment().format('M/D/YYYY'), thumbnail, req.body.isDraft];
        connection.query(queryString, values, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: " Post saved as draft " });
            }
        });
    }

    createPostFromDraft = (req, res, next, thumbnail) => {


        let timeStamp = moment().unix();
        let queryString = 'UPDATE posts SET title = ? , postContent = ?, category = ? , postDate = ? , postTimestamp = ?,    thumbnail = ? , isDraft = ? WHERE postId = ?';
        let values = [req.body.title, req.body.postContent, req.body.category, moment().format('M/D/YYYY'), timeStamp, thumbnail, req.body.isDraft, req.body.postId];
  

        connection.query(queryString, values, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {

                let values = [req.body.userId, 2, req.body.postId, moment().unix(), req.body.postId];
                connection.query("CALL addUserActivity(?,?,?,?,?)", values, (err, queryResult, field) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    }
                    else {
                        res.json({ success: true, message: "Post created successfully", id: req.body.postId });
                    }
                });
            }
        });
    }

    updatePost = (req, res, next) => {
        let queryString = 'UPDATE posts SET title =? , postContent = ?, category = ? , updateDate = ? , updateTimeStamp = ? WHERE postId = ?';
        let values = [req.body.title, req.body.postContent, req.body.category, moment().format('M/D/YYYY'), moment().unix(), req.body.postIdtoUpdate];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: result });
            }
        });
    }

    getRecentPost = (req, res, next) => {
        let queryString = "SELECT * FROM posts WHERE isDraft = 0  ORDER BY postTimeStamp DESC LIMIT 5";
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
        let queryString = "SELECT * FROM posts  WHERE isDraft = 0 ORDER BY updateTimeStamp DESC LIMIT 5";
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

        let queryString = "SELECT * FROM posts WHERE category = ? AND isDraft = 0 ";
        connection.query(queryString, req.params.category, (err, result, field) => {
            if (result.length === 0) {
                res.json({ success: false, message: "No post avavilable of this category" });
            }
            else {
                res.json({ success: true, result: result });
            }
        });
    }

    getPopularPost = (req, res, next) => {
        let queryString = "SELECT * FROM posts  WHERE isDraft = 0 ORDER BY views DESC LIMIT 5";
        connection.query(queryString, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ result });
            }
        });
    }

    getMostLikedPost = (req, res, next) => {
        let queryString = "SELECT * FROM posts  WHERE isDraft = 0 ORDER BY likes DESC LIMIT 5";
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
        let queryString = "SELECT * FROM posts  WHERE isDraft = 0";
        connection.query(queryString, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, result: result })
            }
        })
    }

    updateLikeAndViews = (postId, req, res, next) => {
        let queryString = "update posts set views = (select count(viewId) from views where postId = ?) , likes = (select count(likeId) from likes where postId = ?)where postId = ?;"
        let values = [postId, postId, postId];
        connection.query(queryString, values, (err, result, fields) => {
            if (err) {

                console.log(err)
            }
        });
    }

    getPost = (req, res, next) => {
        this.updateLikeAndViews(req.params.postId);

        let queryString = "SELECT * FROM posts WHERE postId = ?"
        let values = req.params.postId;

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else if (result.length === 0) {
                res.json({ success: false, message: "No Post found!! Try some other filter" });
            }
            else {

                res.json({ success: true, result: result });
            }
        })
    }

    getPostsByYear = (req, res, next) => {
        let queryString = "SELECT * FROM posts WHERE postDate LIKE ? AND isDraft = 0";
        let values = ['%' + req.params.year];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else if (result.length === 0) {
                res.json({ success: false, message: "No Post found!! Try some other filter" });
            }
            else {
                res.json({ success: true, result: result });
            }
        });
    }

    getPostsByMonth = (req, res, next) => {
        let queryString = "SELECT * FROM posts WHERE postDate LIKE ? AND isDraft = 0";
        let values = [req.params.month + '%'];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else if (result.length === 0) {
                res.json({ success: false, message: "No Post found!! Try some other filter" });
            }
            else {
                res.json({ success: true, result: result });
            }
        });
    }

    getPostsByDay = (req, res, next) => {
        let queryString = "SELECT * FROM posts WHERE postDate LIKE ? AND isDraft = 0";
        let values = ['%/' + req.params.day + '/%'];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else if (result.length === 0) {
                res.json({ success: false, message: "No Post found!! Try some other filter" });
            }
            else {
                res.json({ success: true, result: result });
            }
        });
    }

    deletePost = (req, res, next) => {

        let queryString = "DELETE FROM posts WHERE postId = ?";
        let values = [req.body.postIdtoDelete]
        connection.query(queryString, values, (error, result, fields) => {
            if (error) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: result });
            }
        });
    }



    noofComments = (req, res, next) => {
        let queryString = 'SELECT COUNT(commentId) AS Count FROM comments INNER JOIN posts ON posts.postId = comments.postId WHERE comments.postId = ?';
        let values = [req.params.postId];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json(result);
            }
        });
    }

    searchPost = (req, res, next) => {
        // let queryString = `SELECT title,postId, MATCH(title) AGAINST ( ? IN BOOLEAN MODE) AS relevance
        // FROM posts
        // WHERE MATCH(title) AGAINST( ?  IN NATURAL LANGUAGE MODE)
        // ORDER BY relevance DESC
        // LIMIT 10;`
        let queryString = 'SELECT * FROM posts WHERE title LIKE ? AND isDraft = 0 '
        let values = ["%" + req.query.search + "%",];
        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, result: result });
            }
        });
    }

    getDraftPost = (req, res, next) => {
        let queryString = " SELECT * FROM posts WHERE userId = ? AND isDraft = 1";
        let values = [req.params.userId];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, result: result });
            }
        })
    }

    getPostActivity = (req, res, next) => {
        let queryString = "CALL GetPostActivity( ? )";
        let values = req.params.postId;

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else if (result[0].length === 0) {
                res.json({ success: false, message: "No post activity to show" });
            }
            else {
                res.json({ success: true, result: result[0] });
            }
        })
    }

    getPostByUser = (req, res, next) => {
        let queryString = "SELECT * FROM posts WHERE userId = ? AND isDraft = 0 ";
        let values = req.params.userId;
        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, result: result });
            }

        })
    }


}



export default new postModel();