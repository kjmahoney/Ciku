var mongoose = require("./connection")

var DeckSchema = new mongoose.Schema({
  name: String,
  cards: [CardSchema],
})

var CardSchema = new mongoose.Schema({
  original: String,
  translation: String,
  pronounciation: String,
  literal: String,
  context: String,
})

module.exports = {
  Deck: mongoose.model("Deck",DeckSchema)
  Card: mongoose.model("Recipe",RecipeSchema)
}
