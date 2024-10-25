const express = require('express');
// const {chats} = require('./Data/Dummydata');
const connectDB = require('./DB/Db');
const userRouter = require('./Routes/userRoutes');

require('dotenv').config();

connectDB();

const PORT = process.env.PORT || 4000;

const app = express(); // instance of express

app.use(express.json());

app.use('/', userRouter);

app.listen(PORT, ()=>{
    console.log(`Server started!! on ${PORT}`);
})