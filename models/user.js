import {connection} from '../app';

class userModel {

    register(req,res,next)  {
        
        connection.query('SELECT * from users', function (error, results, fields) {
          if (error) throw error;
          console.log("======> "+typeof(results));
          return results;
       
          
        });
    }
      
}

export default new userModel();