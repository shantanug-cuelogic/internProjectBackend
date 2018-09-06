import { connection } from '../app';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { resolve } from 'dns';
import { rejects } from 'assert';

class userModel {

    registerUser = (req, res, next) => {

        let pass = req.body.password;
        bcrypt.hash(pass, 4, (err, hash) => {
            if (err) res.json({ success: false, message: err });

            else {
                let queryString = "INSERT INTO users (firstName,lastName,passKey,email,isAdmin,followers,securityQuestion, securityAnswer) VALUES (?,?,?,?,?,?,?,?)";
                let values = [req.body.firstName, req.body.lastName, hash, req.body.email, req.body.isAdmin, req.body.followers, req.body.securityQuestion, req.body.securityAnswer]
                connection.query(queryString, values, (error, results, fields) => {
                    if (error) {
                        res.json({ success: false, message: error });
                    }
                    else {
                        res.json({ success: true });
                    }
                });
            }
        });
    }

    
    
    loginUser =(req, res, next) => {
        
        let email = req.body.email;
        let queryString = "SELECT userid, email, passKey FROM users WHERE email = ?";
        
        return new Promise((resolve,reject) => {
            connection.query(queryString, [email], (err, queryResult) => {
                console.log("in loginuser ==>");
                
                    if(queryResult.length === 0 ) {
                        // res.json({ success: false, message: "User not found" });
                        res.json({success:false, message:"User not found"})
                       
                    }
                    else {
                        console.log("queryResult==>",queryResult);
                        // res.json(queryResult);
                        resolve(queryResult);
    
                    }
                  
            });
        });
        
    }



}
export default new userModel();