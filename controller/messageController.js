const router = require('express').Router();
const Chat = require('../models/chat');
const Message = require('../models/message');
const authMiddleware = require('../middleware/authMiddleware.js')


router.post('/new-message' , authMiddleware , async(req, res)=>{
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();

        // const currentChat = await Chat.findById(req.body.chatId)
        // currentChat.lastMessage = savedMessage._id;
        // await currentChat.save()

        const currentChat = await Chat.findOneAndUpdate({
            _id : req.body.chatId,
        }, {lastMessage: savedMessage._id,
            $inc: {unreadMessageCount: 1}
        }, {new: true});

        res.status(201).send({
            message: 'Message sent successfully',
            status: "success",
            chat: currentChat,
            data: savedMessage,
        });
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error in the message controller',
            error: error.message,
            status: "fail"
        })
    }
})
 
router.get('/get-messages/:chatId', authMiddleware, async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const messages = await Message.find({ chatId: chatId })
            .populate('senderId', 'name email') // Populate sender details
            .sort({ createdAt: 1 }); // Sort messages by creation date

        res.status(200).send({
            message: 'Messages retrieved successfully',
            status: "success",
            data: messages,
        });
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error in the message controller',
            error: error.message,
            status: "fail"
        });
    }
});

module.exports = router; 