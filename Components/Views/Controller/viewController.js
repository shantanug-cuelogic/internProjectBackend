import viewModel from '../Model/viewModel';

class viewController {
    addViewToPost =(req,res,next) => {
        viewModel.addViewToPost(req,res,next);
    }

    totalViewToPost = (req,res,next) => {
        viewModel.totalViewToPost(req,res,next);
    }

}
export default new viewController();