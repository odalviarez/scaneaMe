//const { MongoServerClosedError } = require('mongodb');
const mongoose = require('mongoose');
const MONGOHOST = "containers-us-west-50.railway.app";
const MONGOPASSWORD = "ke79luJZn1RP73uCvz84";
const MONGOPORT = "6434";
const MONGOUSER = "mongo";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
          process.env.MONGO_URI ||
            `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}`
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