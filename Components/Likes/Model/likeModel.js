import { connection } from '../../../app';

class likeModel {

    addLikeToPost = (req, res, next) => {
        let queryString = 'INSERT INTO likes (postId,userId) VALUES (?,?)';
        let values = [req.body.postIdToLike, req.body.userId];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: "Liked Successfully" });
            }
        })
    }

    removeLikeToPost = (req, res, next) => {
        let queryString = 'DELETE FROM likes WHERE postId = ? AND userId = ?';
        let values = [req.postIdToUnlike, req.userId]

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: "Unliked Successfully" });
            }
        })
    }

    totalLikes = (req, res, next) => {
        let queryString = 'SELECT COUNT(likeId) as totalLikes FROM likes WHERE postId = ?';
        let values = req.params.postId;

        connection.query(queryString, values, (err, result, field) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: "Successfully", count: result[0].totalLikes });
            }
    })
}
    


}
export default new likeModel();