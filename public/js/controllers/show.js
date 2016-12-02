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
    this.percentLearned()
  })



  this.percentLearned= function(){
    if (this.deck.cards.length == 0){
      $scope.percentage = 0;
      $scope.number = 0;
    }else{
    //placeholder
    let learned = []

    //for each card in the deck where learned is true, place into learned array
    for (i =0; i <this.deck.cards.length; i++){
      if(this.deck.cards[i].learned){
        learned.push(this.deck.cards[i])
      }
    }
    console.log(this.deck.cards)
    console.log(learned.length)
    //calculate percentage of cards learned to the cards in the deck
    $scope.percentage = Math.ceil(((learned.length/this.deck.cards.length)*100))

    //total number of cards in deck
    $scope.number = this.deck.cards.length
  }
  }

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
