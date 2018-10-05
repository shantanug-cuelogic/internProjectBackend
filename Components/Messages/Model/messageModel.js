import { connection } from '../../../app';
import moment from 'moment';

class MessageModel {

    sendMessage = (req,res,next) => {
        let queryString =  "INSERT INTO messages (userId, authorId, message, messageTimeStamp) values(?, ?, ?, ?) ";
        let values = [req.body.userId, req.body.authorId, req.body.message, moment().unix()];

        connection.query(queryString,values,(err,result,fields)=>{
            if(err) {
                res.json({success: false , message: err});
            } else {
                res.json({success: true, message: "Message Sent"});
            }
        })
    }

    showMessages = (req,res,next) => {
        let queryString = `SELECT users.firstName,users.profileImage ,messages.message, messages.messageTimeStamp
        FROM messages INNER JOIN users ON users.userId = messages.userId
        WHERE messages.authorId = ? ORDER BY messages.messageTimeStamp DESC `;
        let values = req.params.authorId;

        connection.query(queryString,values,(err,result,fields)=>{
            if(err) {
                res.json({success:false , message:err});
            } else {
                res.json({success:true , result: result});
            }
        })
    }




}

export default new MessageModel();