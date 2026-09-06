const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require("dotenv").config();
const app = require("./src/app.js");
const connectToDB = require("./src/config/database.js")


connectToDB()

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})