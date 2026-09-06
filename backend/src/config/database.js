const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4
    })

    console.log("Connected to DATABASE")
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectToDB;