angular
.module("cards")
.controller("showCtrl",[
  "$stateParams",
  "DeckFactory",
  "$state",
  "$scope",
  showController,
])

function showController($stateParams, DeckFactory, $state, $scope, $index){
  this.deck = DeckFactory.get({name: $stateParams.name}, (res)=>{
    $scope.percentage = percentLearned(this.deck)
    $scope.number = cardsLength(this.deck)
  })

  //Update Deck Name
  this.updateDeck = function() {
    this.deck.$update({name: $stateParams.name})
  }
  //Delete the deck
  this.destroy = function () {
    this.deck.$delete({name: $stateParams.name}).then(function(){
      $state.go("index")
    })
  }
  //Update card within deck
  this.updateCard = function($index, card){
    this.deck.$update({name: $stateParams.name})
  }
  //Create new card within deck
  this.createCard = function(){
    this.deck.cards.push({
      original: $scope.original,
      translation: $scope.translation,
      pronounciation:$scope.pronounciation,
      literal:$scope.literal,
      context:$scope.context,
      learned: false,
    })
    this.deck.$update({name: $stateParams.name})
    this.percentLearned()
  }
  //Delete card within deck
  this.deleteCard = function(index){
    this.deck.cards.splice(index,1)
    this.deck.$update({name: $stateParams.name})
    this.percentLearned()
  }

  $scope.numberCard = 1
  //Conditions to change view on show.html
  newCard = false;
  showTran = false;
  editTitle = false;
  editCard = false;
}
