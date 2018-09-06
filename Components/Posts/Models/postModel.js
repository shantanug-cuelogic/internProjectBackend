import { connection } from '../../../app';
import moment from 'moment';

class postModel {
    createPost = (req, res, next) => {
        let timeStamp = moment().unix();
        let queryString = "INSERT INTO posts(userId,title,postTimestamp,postContent,category,views,likes,rating) VALUES (?,?,?,?,?,?,?,?)";
        let values = [req.body.userId, req.body.title, timeStamp, req.body.postContent, req.body.category, 0, '', 0];
        connection.query(queryString, values, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: "Post created successfully" });
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

    getCategoryPost = (req,res,next) => {
        let queryString = "SELECT * FROM posts WHERE category = ?";
        connection.query(queryString,req.body.category,(err,result,field) => {
            if(result.length === 0) {
                res.json({success:false,message:"No post avavilable of this category"});
            }
            else {
                res.json({result});
            }
        });
    }    

    getPopularPost = (req,res,next) => {
        let queryString = "SELECT * FROM posts ORDER BY views DESC";
        connection.query(queryString, (err,result,field)=> {
            if(err) {
                res.json({success:false, message:err});
            }
            else {
                res.json({result});
            }
        });
    }

    getAllPosts = (req,res,next) => {
        let queryString = "SELECT * FROM posts";
        connection.query(queryString, (err,result,field) => {
            if(err){
                res.json({success:false, message:err});
            }
            else {
                res.json({result})
            }
        })
    }

}



export default new postModel();