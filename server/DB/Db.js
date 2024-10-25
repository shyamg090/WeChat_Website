const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database Connected!! ${connect.connection.name}`);
    } catch (error) {
        console.log(`There was an error while connecting to DB.`);
    }
}

module.exports = connectDB

