const express = require('express');
const app = express();
const authRouter = require('./controller/authController');
const userRouter = require('./controller/userController');

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

module.exports = app; 