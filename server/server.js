const express = require('express');
const {chats} = require('./Data/Dummydata');

const dotenv  = require('dotenv')
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express(); // instance of express

app.get('/', (req,res)=>{
    console.log('server is running');
    res.send('<h1> this is fron server </h1>')
})

app.get('/api/chat', (req,res)=>{
    res.send(chats)
})

app.get('/api/chat/:id', (req,res)=>{
    const singleChat = chats.filter((item, id)=>{
        return item._id === req.params.id
    })
    res.send(singleChat)
})

app.listen(PORT, ()=>{
    console.log(`Server started!! on ${PORT}`);
})