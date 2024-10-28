const express = require('express');
// const {chats} = require('./Data/Dummydata');
const connectDB = require('./DB/Db');
const userRouter = require('./Routes/userRoutes');
const { notFound, errorHandler } = require('./Middlewares/notFound');
const cors = require('cors');

require('dotenv').config();

connectDB();

const PORT = process.env.PORT || 4000;

const app = express(); // instance of express

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    credentials: true                 // Include credentials if needed
  }));

app.use(express.json());

app.use('/api/user', userRouter);

// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server started!! on ${PORT}`);
})