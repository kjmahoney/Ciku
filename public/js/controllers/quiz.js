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
  //launches three.js
  init()

  this.deck = DeckFactory.get({name: $stateParams.name})
  DeckFactory.get({name: $stateParams.name}).$promise.then(response => this.deck.cards = response.cards)
  $scope.score = 0

  this.deck = DeckFactory.get({name: $stateParams.name}, (res)=>{
    percentLearned(this.deck)
  })

  // $scope.query = "Click screen above to begin"
  this.startQuiz = function(){
    speed = 0.01
    let placeHolderArray = []
    quizArray = placeHolderArray.concat(this.deck.cards)
    this.nextQuestion()
  }

  this.nextQuestion = function(){
    question = quizArray[Math.floor(Math.random() * quizArray.length)]
    $scope.query = question.original
    $scope.answer = question.translation
  }

  this.answerQuestion = function(){
      //if user input is that same as the translation
    if ($scope.userAnswer.toUpperCase() == $scope.answer.toUpperCase()){
      //increase session score
      $scope.score += 1
      //increase speed of cube
      speed = ($scope.score/10)
      //set card to learned
      this.deck.cards[this.deck.cards.indexOf(question)].learned = true
      //remove card from the deck
      quizArray.splice(quizArray.indexOf(question),1)
    }else{
      //stop the cube
      speed = 0
      //Set card to unlearned
      this.deck.cards[this.deck.cards.indexOf(question)].learned = false
      //remove card from session
      quizArray.splice(quizArray.indexOf(question),1)
      //update the database
    }

    //if 0 cards in session, end the quiz
    if (quizArray.length == 0){
      //update changes to deck
      this.deck.$update({name: $stateParams.name})
      //return to deck
      $state.go("show", {name: $stateParams.name})
      //alert score to user
      alert("You've completed the deck with a score of" + " " + $scope.score)

    }else{
      //clear the answer box
      $scope.userAnswer=""
      //reset for next question
      this.nextQuestion()
    }
  }
  hideFooter=false
}
