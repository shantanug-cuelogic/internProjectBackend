import viewModel from '../Model/viewModel';
import moment from 'moment';

class viewController {
    addViewToPost = async (req, res, next) => {
        let currentTimeStamp = moment().unix();
        let lastViewTimeStamp = await viewModel.lastViewTimeStamp(req, res, next);
        if (lastViewTimeStamp === null) {
            viewModel.addViewToPost(req, res, next);
        }
        else {
            let timeDiff = currentTimeStamp - lastViewTimeStamp;
            if (timeDiff > 86400) {
                viewModel.addViewToPost(req,res,next);
            }
            else {
                res.json({success:false,message:"Already View The Post"});
            }
        }
    }

    totalViewToPost = (req, res, next) => {
        viewModel.totalViewToPost(req, res, next);
    }

}
export default new viewController();