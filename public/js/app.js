console.log("app.js connected")
//set up factory link, figure out why this page isn't being found
angular
.module("cards", [
  "ui.router",
  "ngResource",
])
.config([
  "$stateProvider",
  Router,
])
.factory("DeckFactory",[
  "$resource",
  DeckFactoryFunction,

])
.controller("indexCtrl", [
  "$state",
  "DeckFactory",
  indexController,
])
.controller("showCtrl",[
  "$stateParams",
  "DeckFactory",
  "$state",
  "$scope",
  showController
])
.controller("quizCtrl",[
  "$stateParams",
  "DeckFactory",
  "$state",
  "$scope",
  quizController
])

function Router($stateProvider){
  console.log("router working")
  $stateProvider
  .state("index",{
    url: "/",
    templateUrl :"./js/ng-views/index.html",
    controller: "indexCtrl",
    controllerAs:"vm"
  })
  .state("show",{
    url:"/decks/:name",
    templateUrl:"./js/ng-views/show.html",
    controller:"showCtrl",
    controllerAs:"vm"
  })
  .state("quiz",{
    url:"/decks/:name/quiz",
    templateUrl:"./js/ng-views/quiz.html",
    controller:"quizCtrl",
    controllerAs:"vm"
  })
}

function DeckFactoryFunction($resource){
  return $resource("/api/decks/:name", {}, {
    update: { method: "PUT" }
  });
}

function indexController($state, DeckFactory){
  console.log("index controller working")
  this.decks = DeckFactory.query();
  this.newDeck = new DeckFactory()
  this.create = function(){
    this.newDeck.$save().then(deck=>{
      $state.go("index", {}, { reload: true });
    })
  }
}

function showController($stateParams, DeckFactory, $state, $scope, $index){
  console.log("show controller working")
  this.deck = DeckFactory.get({name: $stateParams.name})
  console.log(this.deck)
  this.update = function() {
    this.deck.$update({name: $stateParams.name})
    console.log($stateParams.name)
  }

  this.destroy = function () {
    this.deck.$delete({name: $stateParams.name}).then(function(){
      $state.go("index")
    })
  }

  this.updateCard = function($index, card){
    this.deck.$update({name: $stateParams.name})
  }

  this.createCard = function(){
    console.log($scope.original)
    this.deck.cards.push({
      original: $scope.original,
      translation: $scope.translation,
      pronounciation:$scope.pronounciation,
      literal:$scope.literal,
      context:$scope.context,
    })
    this.deck.$update({name: $stateParams.name})
  }

  this.deleteCard = function(index){
    this.deck.cards.splice(index,1)
    this.deck.$update({name: $stateParams.name})
  }
  newCard = false;
  showTran = false;
  editTitle = false;
  editCard = false;
}

function quizController($stateParams, DeckFactory, $state, $scope, $index){
  console.log("quiz working")
  init()
  this.deck = DeckFactory.get({name: $stateParams.name})
  DeckFactory.get({name: $stateParams.name}).$promise.then(response => this.deck.cards = response.cards)
  $scope.score = 0

  this.startQuiz = function(){
    placeHolderArray = []
    quizArray = placeHolderArray.concat(this.deck.cards)
    randomNumber = Math.floor(Math.random() * quizArray.length)
    let question = quizArray[randomNumber]
    $scope.query = question.original
    $scope.answer = question.translation
  }

  this.answerQuestion = function(){
    randomNumber = Math.floor(Math.random() * quizArray.length)
    let question = quizArray[randomNumber]
    if ($scope.userAnswer.toUpperCase() == $scope.answer.toUpperCase()){
      console.log("correct")
      $scope.query = question.original
      $scope.answer = question.translation
      $scope.score += 1
      quizArray.pop(quizArray.indexOf(question))
      speed = ($scope.score/10)
      this.deck.cards[randomNumber].learned = true
      this.deck.$update({name: $stateParams.name})
      checkCards = this.deck.cards
      if (quizArray.length == 0){
        alert("You've finished the deck!")
        learnedCalculator()
      }
    }else{
      console.log("incorrect")
      //Set learned status of card to false and update database
      this.deck.cards[randomNumber].learned = false
      this.deck.$update({name: $stateParams.name})
      //Session score reduced by one
      $scope.score -= 1
      speed = 0
    }
      }
      learnedCalculator = function(){
        console.log(this.deck)
        let learned = 0
        let unlearned = 0
        for (i=0;i<this.deck.cards.length; i++){
          if (this.deck.cards[i].learned){
            learned.push(this.deck.cards[i])
          }else{
            unlearned.push(this.deck.cards[i])
          }
          percentLearned = (learned/unlearned * 100)
          console.log(percentLearned)
    }
  }
}
