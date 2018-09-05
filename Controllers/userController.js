import { connection } from '../app';

class UserControllers {

    registerUser = (req, res, next) => {
        let queryString = "INSERT INTO users (firstName,lastName,passKey,email,isAdmin,followers) VALUES (?,?,?,?,?,?)";
        let values = [req.body.firstName, req.body.lastName, req.body.password, req.body.email, req.body.isAdmin, req.body.followers]
        connection.query(queryString, values, (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        });
    }

    loginUser = (req, res, next) => {

    }



}
export default new UserControllers();