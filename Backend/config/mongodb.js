const mongoose = require("mongoose");


const connectToMongoDb = async () => {

    await mongoose.connection.on('connected' , () => {
        console.log("DB CONNECTED");
    })

  await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
};

module.exports = { connectToMongoDb };
