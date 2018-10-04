import { connection } from '../../../app';
import moment from 'moment';

class viewModel {

    updateLikeAndViews = (postId, req, res, next) => {
        let queryString = "update posts set views = (select count(viewId) from views where postId = ?) , likes = (select count(likeId) from likes where postId = ?)where postId = ?;"
        let values = [postId, postId, postId];
        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
              console.log(err)
            }
        });
    }

    addViewToPost = (req, res, next) => {
        let queryString = "INSERT INTO views (postId,userId, viewTimeStamp) VALUES (?,?,?)";
        let values = [req.body.postIdToView, req.body.userId , moment().unix()];
        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                this.updateLikeAndViews(req.body.postIdToView);
                res.json({success:true, message:"View Added to post"});
            }
        })
    }

    totalViewToPost = (req, res, next) => {
        let queryString = 'SELECT COUNT(viewId) as totalviews FROM views WHERE postId = ?';
        let values = req.params.postId;

        connection.query(queryString, values, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                this.updateLikeAndViews(req.params.postId);
                res.json({ success: true, message: "Successfully", count: result[0].totalviews });
            }
        })
    }

    lastViewTimeStamp = (req,res,next) => {
        let queryString= "SELECT viewTimeStamp FROM views WHERE postId = ? and userId = ? ORDER BY viewTimeStamp desc LIMIT 1"
        let values = [req.body.postIdToView, req.body.userId];

        return new Promise((resolve, reject) => {
            connection.query(queryString, values, (err, queryResult) => {
                if(err) {
                    res.json({success:false, message:err});
                }

                else if(queryResult.length === 0) {
                    this.addViewToPost(req,res,next)
                }

                else {
                     resolve(queryResult[0].viewTimeStamp);
                }
            });
        });
    }

    


}
export default new viewModel();