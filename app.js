const express = require('express');
const app = express();
const authRouter = require('./controller/authController');
const userRouter = require('./controller/userController');
const chatRouter = require('./controller/chatController');
const messageRouter = require('./controller/messageController');

app.use(express.json());

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

const userSocketMap = {}; // { userId: socket.id }

io.on('connection', (socket) => {
  console.log('📡 Socket connected: ' + socket.id);

  socket.on('join-room', (user) => {
    userSocketMap[user._id] = socket.id;
    console.log(`${user.firstname} joined as ${user._id}`);
    console.log(`userSocketMap is : ${userSocketMap[user._id]}`)
  });

  socket.on('send-message', (data) => {
    const recipientSocketId = userSocketMap[data.recipient];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('recieve-msg', data.msg);
    }
  });

  socket.on('disconnect', () => {
    // Optionally remove user from map
    for (const userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
  });
});



app.get('/', (req, res) => {
  res.send('Server Is Running')
})

module.exports = server; 