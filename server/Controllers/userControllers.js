const { User } = require("../Models/userModel");
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const isUserPresent = await User.findOne({ email: email });
    // adding method to User model
    if (isUserPresent && (await isUserPresent.matchPassword(password))) {

        const jwt_token = jwt.sign({ email: isUserPresent.email }, process.env.JWT_SECRET);

        res.json({
            _id: isUserPresent._id,
            name: isUserPresent.name,
            email: isUserPresent.email,
            pic: isUserPresent.pic,
            token: jwt_token
        })
    }
    else{
        res.json({
            msg : 'Wrong Email or Password!!'
        })
    }
}

const signupUser = async (req, res) => {

    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.json({
            msg: 'Please Enter All the fields'
        })
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
        res.status(400).json({
            msg: "User already exists"
        })
        return;
    }


    const user = new User({
        name: name,
        email: email,
        password: password,
        pic: pic
    })

    const savedUser = await user.save();

    try {
        if (savedUser) {

            const jwt_token = jwt.sign({ email: savedUser.email }, process.env.JWT_SECRET);

            // console.log(jwt_token);

            res.status(201).json({
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                pic: savedUser.pic,
                jwt_token: jwt_token
            })
        }
    } catch (e) {
        console.log('seems like user was not saved');
    }
}

module.exports = { loginUser, signupUser };