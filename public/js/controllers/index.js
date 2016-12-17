angular
.module("cards")
.controller("indexCtrl", [
  "$state",
  "DeckFactory",
  indexController,
])

function indexController($state, DeckFactory){
  this.decks = DeckFactory.query()
  //create a new deck
  this.newDeck = new DeckFactory()
  this.create = function(){
    this.newDeck.$save().then(deck=>{
      $state.go("index", {}, { reload: true })
    })
  }

  //constant variable
  showField = false

}
