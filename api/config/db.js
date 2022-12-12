//const { MongoServerClosedError } = require('mongodb');
const mongoose = require('mongoose');

const { MONGOHOST, MONGOPASSWORD, MONGOPORT, MONGOUSER } = process.env;

mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect( //MONGO_URI no existe asi que la vamos a sacar
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