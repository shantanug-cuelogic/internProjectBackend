import { connection } from '../../../app'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../Model/userModel';
import multer from 'multer';
import nodemailer from 'nodemailer';
import uuidToken from 'uuid-token-generator';

require('dotenv').config();

class UserControllers {

    registerUser = (req, res, next) => {
        userModel.registerUser(req, res, next, );
    }

    authenticateUser = (req, res, next) => {
        userModel.authenticateUser(req,res,next);
    }

    loginUser = async (req, res, next) => {
        let queryResult = await userModel.loginUser(req, res, next);

        bcrypt.compare(req.body.password, queryResult[0].passKey, (err, result) => {
            if (result) {
                jwt.sign({
                    userId: queryResult[0].userId,
                    email: queryResult[0].email,
                    isAdmin: queryResult[0].isAdmin
                }, process.env.SECRETKEY, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    }
                    else {
                        console.log(queryResult);
                        res.json({
                            success: true,
                            message: "Successfully Logged in",
                            authToken: token,
                            userDetails:queryResult[0] 

                        });
                    }
                });
            }
            else {
                res.json({ success: false, message: "Password is incorrect" });
            }
        });
    }

    changePassword = (req, res, next) => {
        userModel.changePassword(req, res, next);
    }

    passwordTemplate = (TOKEN, firstName) => {
        return (
            `<head>
            <title>Rating Reminder</title>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
            <meta content="width=device-width" name="viewport">
            <style type="text/css">
                        @font-face {
                          font-family: &#x27;Postmates Std&#x27;;
                          font-weight: 600;
                          font-style: normal;
                          src: local(&#x27;Postmates Std Bold&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-bold.woff) format(&#x27;woff&#x27;);
                        }
            
                        @font-face {
                          font-family: &#x27;Postmates Std&#x27;;
                          font-weight: 500;
                          font-style: normal;
                          src: local(&#x27;Postmates Std Medium&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-medium.woff) format(&#x27;woff&#x27;);
                        }
            
                        @font-face {
                          font-family: &#x27;Postmates Std&#x27;;
                          font-weight: 400;
                          font-style: normal;
                          src: local(&#x27;Postmates Std Regular&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-regular.woff) format(&#x27;woff&#x27;);
                        }
                    </style>
            <style media="screen and (max-width: 680px)">
                        @media screen and (max-width: 680px) {
                            .page-center {
                              padding-left: 0 !important;
                              padding-right: 0 !important;
                            }
                            
                            .footer-center {
                              padding-left: 20px !important;
                              padding-right: 20px !important;
                            }
                        }
                    </style>
            </head>
            <body style="background-color: #f4f4f5;">
            <table cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f5; text-align: center;">
            <tbody><tr>
            <td style="text-align: center;">
            <table align="center" cellpadding="0" cellspacing="0" id="body" style="background-color: #fff; width: 100%; max-width: 680px; height: 100%;">
            <tbody><tr>
            <td>
            <table align="center" cellpadding="0" cellspacing="0" class="page-center" style="text-align: left; padding-bottom: 88px; width: 100%; padding-left: 120px; padding-right: 120px;">
            <tbody><tr>
            <td style="padding-top: 24px;">
            <h2>Hello!</h2>
            <h3>${firstName}</h3>
            </td>
            </tr>
            <tr>
            <td colspan="2" style="padding-top:30px; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #000000; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 48px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: -2.6px; line-height: 52px; mso-line-height-rule: exactly; text-decoration: none;">Reset your password</td>
            </tr>
            <tr>
            <td style="padding-top: 48px; padding-bottom: 48px;">
            <table cellpadding="0" cellspacing="0" style="width: 100%">
            <tbody><tr>
            <td style="width: 100%; height: 1px; max-height: 1px; background-color: #d9dbe0; opacity: 0.81"></td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            <tr>
            <td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                                  You're receiving this e-mail because you requested a password reset for your BlogIt account.
                                                </td>
            </tr>
            <tr>
            <td style="padding-top: 24px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                                  Please tap the button below to choose a new password.
                                                </td>
            </tr>
            <tr>
            <td>
            <a data-click-track-id="37" href=${TOKEN} style="margin-top: 36px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #ffffff; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 12px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: 0.7px; line-height: 48px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 220px; background-color: #00cc99; border-radius: 28px; display: block; text-align: center; text-transform: uppercase" target="_blank">
                                                    Reset Password
                                                  </a>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            
            </td>
            </tr>
            </tbody></table>
            </body>`
        )
    }

    forgotPassword = async (req, res, next) => {
        let isUser = await userModel.searchUser(req, res, next);

        if (Number.isInteger(isUser[0].userId)) {

            const tokgen = new uuidToken(); // Default is a 128-bit token encoded in base58
            const token = tokgen.generate();
            let emailTemplate = this.passwordTemplate("http://localhost:3000/recoverpassword/" + token, isUser[0].firstName);
            nodemailer.createTestAccount((err, account) => {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'shantanu.gade@cuelogic.com',
                        pass: 'Shantanu007@'
                    }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"Shantanu Gade" <shantanu.gade@cuelogic.com>', // sender address
                    to: req.body.email, // list of receivers
                    subject: ' Reset Your Password', // Subject line
                    text: '', // plain text body
                    html: emailTemplate // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                        res.json({ success: false, message: "Could not send the recovery link" })
                    }
                    else {
                        userModel.storeForgetPasswordToken(req, res, next, isUser[0].userId, token);
                    }
                });
            });
        }
    }

    checkForgetToken = (req, res, next) => {
        userModel.checkForgetPasswordToken(req, res, next);
    }

    userProfile = (req, res, next) => {
        userModel.userProfile(req, res, next);
    }

    updateUserProfile = (req, res, next) => {
        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/profilePicture')
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now() + ".jpg")
            }
        });
        var upload = multer({ storage: storage }).single('file');

        upload(req, res, (err) => {

            if (err) {
                res.json(err);
            } else {

                if (req.file === undefined) {
                    userModel.updateUserProfile(req, res, next, req.body.profileImage);
                }
                else {
                    let profilePicture = '/profilePicture/' + req.file.filename;
                    userModel.updateUserProfile(req, res, next, profilePicture);
                }
            }
        })
    }

    getRecentActivity = (req,res,next) => {
        userModel.getRecentActivity(req,res,next);
    }

    deleteUser = (req, res, next) => {
        userModel.deleteUser(req, res, next);
    }
    noofLikes = (req, res, next) => {
        userModel.noofLikes(req, res, next);
    }
    noofViews = (req, res, next) => {
        userModel.noofViews(req, res, next);
    }
    noofPosts = (req, res, next) => {
        userModel.noofPosts(req, res, next);
    }
    noofComments = (req, res, next) => {
        userModel.noofComments(req, res, next);
    }
    getViewsPerPost = (req,res,next) => {
        userModel.getViewsPerPost(req,res,next);
    }
    getFollowerInfo = (req,res,next) => {
        userModel.getFollowerInfo(req,res,next);
    }
    getAllUsers = (req,res,next) => {
        userModel.getAllusers(req,res,next);
    }

}
export default new UserControllers();