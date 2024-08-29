const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://manishakri126:manisha_123@cluster0.j9n42.mongodb.net/fullstack-assignment"
    )
    .then(() => console.log("Connected to database successfully"));
};

module.exports = connectDB;