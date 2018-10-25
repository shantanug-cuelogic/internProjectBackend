import postModel from '../Models/postModel';
import multer from 'multer';

class postController {
    createPost = (req, res, next) => {


        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/thumbnail')
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now() + ".jpg")
            }
        });
        let upload = multer({ storage: storage }).single('file');

        upload(req, res, (err) => {

            if (err) {

                res.json(err);
            } else {

                if(req.file === undefined) {
                    postModel.createPost(req, res, next, '/require/defaultthumbnail.jpg');
                }
               
               else {
                let thumbnail = '/thumbnail/' + req.file.filename;
                postModel.createPost(req, res, next, thumbnail);
                
               } 
            }
        })
    }

    savepost = (req,res,next) => {
       
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/thumbnail')
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now() + ".jpg")
            }
        });
        let upload = multer({ storage: storage }).single('file');

        upload(req, res, (err) => {

            if (err) {

                res.json(err);
            } else {

                if(req.file === undefined) {
                    postModel.createPostFromDraft(req, res, next, '/require/defaultthumbnail.jpg');
                }
               
               else {
                let thumbnail = '/thumbnail/' + req.file.filename;
                postModel.createPostFromDraft(req, res, next, thumbnail);
                
               } 
            }
        }) 
    }

    updatePost = (req, res, next) => {
        postModel.updatePost(req, res, next);
    }

    getRecentPost = (req, res, next) => {
        postModel.getRecentPost(req, res, next);
    }

    getRecentlyUpdatedPosts = (req, res, next) => {
        postModel.getRecentUpdatedPost(req, res, next);
    }

    getCategoryPost = (req, res, next) => {
        postModel.getCategoryPost(req, res, next);
    }

    getPopularPost = (req, res, next) => {
        postModel.getPopularPost(req, res, next);
    }

    getMostLikedPost = (req, res, next) => {
        postModel.getMostLikedPost(req, res, next);
    }

    getAllPosts = (req, res, next) => {
        postModel.getAllPosts(req, res, next);
    }

    getPost = (req, res, next) => {
        postModel.getPost(req, res, next);
    }

    getPostByYear = (req, res, next) => {
        postModel.getPostsByYear(req, res, next);
    }

    getPostByMonth = (req, res, next) => {
        postModel.getPostsByMonth(req, res, next);
    }
    getPostByDay = (req, res, next) => {
        postModel.getPostsByDay(req, res, next);
    }

    deletePost = (req, res, next) => {
        postModel.deletePost(req, res, next);
    }

    noofComments = (req, res, next) => {
        postModel.noofComments(req, res, next);
    }

    searchPost = (req, res, next) => {
        postModel.searchPost(req, res, next);
    }

    getDraftPost = (req,res,next) => {
        postModel.getDraftPost(req,res,next);
    }
    getPostActivity = (req,res,next) => {
        postModel.getPostActivity(req,res,next);
    }
    getPostByUser = (req,res,next) => {
        postModel.getPostByUser(req,res,next);
    }
}

export default new postController();