var mongoose = require("./connection.js")

var CardSchema = new mongoose.Schema({
  original: String,
  translation: String,
  pronounciation: String,
  literal: String,
  context: String,
  learned: Boolean,
})

var DeckSchema = new mongoose.Schema({
  name: String,
  cards: [CardSchema],
})

module.exports = {
  Deck: mongoose.model("Deck",DeckSchema),
  Card: mongoose.model("Card",CardSchema),
}
