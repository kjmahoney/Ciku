var mongoose =require('./connection.js')
var seedData =require('./seeds')
var models = require('./models')

var Deck = mongoose.model('Deck')

var Card = mongoose.model('Card')


Deck.remove({}).then(_=>{
  Deck.collection.insert(seedData)
  .then(_=> process.exit())
}).catch(err=>console.log(err))
