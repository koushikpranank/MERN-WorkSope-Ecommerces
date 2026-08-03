const mongoose = require("mongoose");

const DBconnection = async () => {
  try {
    // { family: 4 } forces it to use standard IPv4
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
};

module.exports = DBconnection;
