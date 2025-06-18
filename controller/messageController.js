const router = require('express').Router();
const Chat = require('../models/chat');
const Message = require('../models/message');
const authMiddleware = require('../middleware/authMiddleware.js')


router.post('/new-message' , authMiddleware , async(req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error in the message controller',
            error: error.message,
            status: "fail"
        })
    }
})