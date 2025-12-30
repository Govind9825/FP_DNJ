const mongoose = require("mongoose");

const connectToMongo = async () => {
  const mongoURI = process.env.MONGO_URI
  try {
    await mongoose.connect(mongoURI);
    console.log("DB connected!!")
  } catch (error) {
    console.error("Error connecting to mongoose:", error);
  }
};

module.exports = connectToMongo;
