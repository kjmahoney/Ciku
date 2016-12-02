var mongoose = require("mongoose")


mongoose.Promise =global.Promise

module.exports = mongoose

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project4")
