import jwt from 'jsonwebtoken';
require('dotenv').config();



class authenticationMiddleware {

    auth = (req, res, next) => {
        
        
   
        jwt.verify(req.body.authToken, process.env.SECRETKEY, (err, decoded) => {
            if (err) {
                res.json({ success: false, message: err })
            }
            else {
                req.body.isAdmin = decoded.isAdmin;
                req.body.userId =  decoded.userId;
                next();
            }
        });
    }



}

export default new authenticationMiddleware();

