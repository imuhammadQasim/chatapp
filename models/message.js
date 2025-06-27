const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachments: [{
        type: String // URL or path to the attachment
    }],
    read: [{
        type: Boolean,
        default: true,
    }]
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;