import { connection } from '../../../app';

class ratingModel {

    giveRating = (req, res, next) => {

        console.log("=================>",req.body.rating)
        let queryString = 'SELECT * FROM ratings WHERE userId= ? AND postId = ?';
        let values = [req.body.userId, req.body.postId];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                if (result.length === 0) {
                    let innerQueryString = 'INSERT INTO ratings (postId, userId, rating) VALUES(?,?,?);';
                    let innerValues = [req.body.postId, req.body.userId, req.body.rating];

                    connection.query(innerQueryString, innerValues, (err, result, fields) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        }
                        else {
                            res.json({success: true, result:result});
                        }
                    });
                }
                else {
                    let innerQueryString = 'UPDATE ratings SET rating = ? WHERE userId = ? AND postId= ?';
                    let innerValues = [req.body.rating, req.body.userId,req.body.postId];
                    connection.query(innerQueryString, innerValues, (err, result, fields) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        }
                        else {
                            res.json({success:true , result:result});
                        }
                    });
                }
            }
        });



    }

    getRating = (req, res, next) => {
        let queryString = 'SELECT AVG(rating) AS Ratings FROM ratings INNER JOIN posts ON ratings.postId = posts.postId WHERE ratings.postId = ? ';
        let values = [req.params.postId];

        connection.query(queryString, values, (err, result, fields) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json(result[0]);
            }
        });
    }

}

export default new ratingModel();