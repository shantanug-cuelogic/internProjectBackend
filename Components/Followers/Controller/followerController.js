import followerModel from '../Model/followerModel';


class FollowerController {
    addFollower =  (req, res, next) => {

        if(req.body.userIdToFollow === req.body.userId) {
            res.json({success : false , message :"You cannot follow Yourself" })
        }
        else {
            followerModel.addFollower(req, res, next);
         }

    }

    unfollow =  (req, res, next) => {

        if(req.body.userIdToUnfollow === req.body.userId) {
            res.json({success : false , message :"You cannot Unfollow Yourself" })
        }
        else {
            followerModel.unfollow(req, res, next);
        }

        
    }

    alreadyFollowed = (req, res, next) => {
        if(req.body.userIdToFollow === req.body.userId) {
            res.json({success:false , message:"You cannot follow Yourself"})
        }
        else {
            followerModel.alreadyFollowed(req, res, next);
        }
    }
}

export default new FollowerController();