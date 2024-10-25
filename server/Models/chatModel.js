// chat name, isgroupchat, users , latest msg, group admin

const mongoose = require('mongoose');

// mongoose.model({model}, {timestamp : true})

const chatModel = mongoose.model({
    chatName: { type: String, trim: true }, //string type and trim-removes unused extra spaces
    isGroupChat: { type: Boolean, default: false }, //initially store only messages , if needed store group chat
    users: [ //array of 'object ID' linked in users that chat
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    latestMessage: { //latest message from message table
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    ,
}, 
{
    timestamps: true //timestamp auto if new chat is created
});

const Chat = mongoose.model('Chat', chatModel);

module.exports = {Chat}