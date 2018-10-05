import { connection } from '../../../app';
import moment from 'moment';

class FeedbackModel {

    sendFeedBack = (req,res,next) => {
        let queryString = " INSERT INTO feedbacks(userId, authorId, feedback, feedbackTimeStamp) values(?,?,?,?)";
        let values = [ req.body.userId, req.body.authorId, req.body.feedback, moment().unix() ];

        connection.query(queryString, values, (err,result,fields)=>{
            if(err) {
                res.json({success: false , message : err});
            } else {
                res.json({success:true, message: "Feedback sent to author "});
            }
        });
    }

    showFeedback = (req,res,next) => {
        let queryString = `SELECT users.firstName,users.lastName,users.profileImage ,feedbacks.feedback,feedbacks.feedbackTimeStamp
        FROM feedbacks INNER JOIN users ON users.userId = feedbacks.userId
        WHERE feedbacks.authorId = ?`;
        let values =  req.params.authorId;
        connection.query(queryString,values,(err,result,fields)=>{
            if(err) {
                res.json({success:false , message: err});
            } else {
                res.json({success: true , result:result});
            }
        })
    }


}

export default new FeedbackModel();