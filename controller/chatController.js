const Chat = require('../models/chat');
const User = require('../models/user');
const router= require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create-chat', authMiddleware, async (req, res) => {
    try {
        const { members} = req.body;
        if (!members || members.length < 2) {
            return res.status(400).json({
                message: 'At least two members are required to create a chat.'
            });
        }
        console.log('Creating chat with members:', members);
        const chat = new Chat(req.body);
        const savedChat = await chat.save();
        
        res.status(201).json({
            message: 'Chat created successfully',
            data: savedChat
        });
        
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
})

router.get('/get-all-chat', authMiddleware, async (req, res) => {
    try {
        const allChats = await Chat.find({members: {$in : req.userData.userId}});        
        res.status(200).json({
            message: 'All Chats fetched successfully',
            success: true,
            data: allChats
        });
        
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
})

module.exports = router;