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

  showField = false

}


// function indexController($state, DeckFactory){
//   this.decks = DeckFactory.query().$promise.then(function(results){
//     for(var result in results){
//       if(results[result]._id){
//         results[result].percentage = percentLearned(results[result])
//       }
//     }
//     this.decks = results;
//   })
