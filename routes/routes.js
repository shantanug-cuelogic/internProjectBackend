import express from 'express';
import Controllers from '../Controllers/Controllers';

var router = express.Router();

/* GET home page. */
router.post('/registerUser', Controllers.registerUser );

module.exports = router;
