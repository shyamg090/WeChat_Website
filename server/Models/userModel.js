const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userModel = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pic: {
        type: String,
        default: "https://avatar.iran.liara.run/public/boy"
    }
},
    {
        timestamps: true
    }
);

userModel.methods.matchPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

// arrow function do not have their own this context

userModel.pre('save', function (next) { //before saving run this callback function
    
    if (!this.isModified) return next();

    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();

});

const User = mongoose.model('User', userModel);

module.exports = { User };