angular
.module("cards")
.controller("quizCtrl",[
  "$stateParams",
  "DeckFactory",
  "$state",
  "$scope",
  quizController
])

function quizController($stateParams, DeckFactory, $state, $scope, $index){
  console.log("quiz working")
  init()
  this.deck = DeckFactory.get({name: $stateParams.name})
  DeckFactory.get({name: $stateParams.name}).$promise.then(response => this.deck.cards = response.cards)
  $scope.score = 0

  this.startQuiz = function(){
    let placeHolderArray = []
    quizArray = placeHolderArray.concat(this.deck.cards)
    randomNumber = Math.floor(Math.random() * quizArray.length)
    question = quizArray[randomNumber]
    $scope.query = question.original
    $scope.answer = question.translation
  }

  this.answerQuestion = function(){

    //user input is that same as the
    if ($scope.userAnswer.toUpperCase() == $scope.answer.toUpperCase()){
      //increase score, speed, and set card to learned in database
      $scope.score += 1
      speed = ($scope.score/10)
      this.deck.cards[randomNumber].learned = true
      //remove card from quizArray
      console.log(quizArray)
      console.log(quizArray.indexOf(question))
      quizArray.splice(quizArray.indexOf(question),1)

      if (quizArray.length == 0){
        alert("You've finished the deck!")
        $state.go("show", {name: $stateParams.name})
      }else{

      //update changes in database
      this.deck.$update({name: $stateParams.name})

      //reset for next question
      randomNumber = Math.floor(Math.random() * quizArray.length)
      question = quizArray[randomNumber]
      $scope.query = question.original
      $scope.answer = question.translation
    }
    }else{
      console.log("incorrect")
      //Set learned status of card to false and update database
      this.deck.cards[randomNumber].learned = false
      this.deck.$update({name: $stateParams.name})
      //Session score reduced by one
      $scope.score -= 1
      speed = 0
      quizArray.splice(quizArray.indexOf(question),1)
      if (quizArray.length == 0){
        alert("You've finished the deck!")
        $state.go("show", {name: $stateParams.name})
      }else{
      randomNumber = Math.floor(Math.random() * quizArray.length)
      question = quizArray[randomNumber]
      $scope.query = question.original
      $scope.answer = question.translatio
    }
    }

  }
}
