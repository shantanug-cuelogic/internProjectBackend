import {connection } from '../app';

class privileges {
    deleteUser = (req,res,next) => {
        if(req.body.userIdtoDelete === req.body.userId  || req.body.isAdmin === 1) {
            next();
        }
        else {
            res.json({success:false, message : "UnAuthorized"});
        }
    }
    updateUser =  (req,res,next) => {
        if(req.body.userIdtoUpdate === req.body.userId  || req.body.isAdmin === 1) {
            next();
        }
        else {
            res.json({success:false, message : "UnAuthorized"});
        }
    }

    updatePost = (req,res,next) => {
        let queryString = 'SELECT userId FROM posts WHERE postId = ?';
        let values = [req.body.postIdtoUpdate];

        connection.query(queryString,values,(err,result,fields) => {
            if(err) {
                res.json({success:false,message:err});
            }
            else {
                if(req.body.userId === result[0].userId || req.body.isAdmin === 1) {
                    next();
                }
                else{
                    res.json({success:false, message : "Unauthorized"});
                }
            }
        });
    }

    deletePost = (req,res,next) => {

        console.log(req.body);
        let queryString = 'SELECT userId FROM posts WHERE postId = ?';
        let values = [req.body.postIdtoDelete];

        connection.query(queryString,values,(err,result,fields) => {
            if(err) {
                res.json({success:false,message:err});
            }
            else {
                console.log("===============>", result);
                if(req.body.userId === result[0].userId || req.body.isAdmin === 1) {
                    next();
                }
                else{
                    res.json({success:false, message : "Unauthorized"});
                }
            }
        });
    }
    
    deleteComment = (req,res,next) => {
        let queryString = 'SELECT userId FROM comments WHERE commentId = ?';
        let values = [req.body.commentIdtoDelete];

        connection.query(queryString,values,(err,result,fields) => {
            if(err) {
                res.json({success:false,message:err});
            }
            else {
                if(req.body.userId === result[0].userId || req.body.isAdmin === 1) {
                    next();
                }
                else{
                    res.json({success:false, message : "Unauthorized"});
                }
            }
        });
    }

    updateComment = (req,res,next) => {
        let queryString = 'SELECT userId FROM comments WHERE commentId = ?';
        let values = [req.body.commentIdtoUpdate];

        connection.query(queryString,values,(err,result,fields) => {
            if(err) {
                res.json({success:false,message:err});
            }
            else {
                if(req.body.userId === result[0].userId || req.body.isAdmin === 1) {
                    next();
                }
                else{
                    res.json({success:false, message : "Unauthorized"});
                }
            }
        });
    }


}


export default new privileges();