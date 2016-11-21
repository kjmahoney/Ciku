var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/project4")

mongoose.Promise =global.Promise

module.exports = mongoose
