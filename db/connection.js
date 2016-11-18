var mongoose = require("mongoose")

mongoose.connect("mongodb://local-host/project4")

mongoose.Promise =global.Promise

module.exports = mongoose
