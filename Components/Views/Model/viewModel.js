import { connection } from '../../../app';

class viewModel {

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

    addViewToPost = (req,res,next) => {
        let queryString = "INSERT INTO views (postId,userId) VALUES (?,?)";
        let values = [req.body.postIdToView,req.body.userId];
        connection.query(queryString,values,(err,result,fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                this.updateLikeAndViews(req.body.postIdToView);
                res.json( true );
            }
        })
    }

    totalViewToPost = (req,res,next) => {
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


}
export default new viewModel();