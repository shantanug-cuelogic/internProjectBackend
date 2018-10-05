import messageModel from '../Model/messageModel';


class MessageController {

    sendMessage = (req,res,next) => {
        messageModel.sendMessage(req,res,next);
    }
    
    showMessages = (req,res,next) => {
        messageModel.showMessages(req,res,next);
    }

}

export default new MessageController();