//const { MongoServerClosedError } = require('mongodb');
const mongoose = require('mongoose');
const MONGOHOST = "scaneame.ermgdf6.mongodb.net";
const MONGOPASSWORD = "1234";
const MONGOPORT = "6434";
const MONGOUSER = "scaneaMe";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
          process.env.MONGO_URI ||
            `mongodb+srv://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}/scaneaMe`
        );
    
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error); {
            console.log(error);
            process.exit(1)
        }
    }
}

module.exports = connectDB;