const mongoose = require("mongoose");


const connectToMongoDb = async () => {

    mongoose.connection.on('connected' , () => {
        console.log("DB CONNECTED");
    })

  await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
};

module.exports = { connectToMongoDb };
