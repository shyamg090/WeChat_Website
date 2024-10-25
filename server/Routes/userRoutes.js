const express = require('express');
const { loginUser, signupUser } = require('../Controllers/userControllers');

const userRouter = express.Router();

userRouter.post('/api/user/login', loginUser);
userRouter.post('/', signupUser);

module.exports = userRouter;