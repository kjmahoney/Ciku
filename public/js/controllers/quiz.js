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
  //launches three.js to spin cube
  init()
  //set score to zero
  $scope.score = 0
  $scope.message = ""

  function clearMessage(){
    $scope.message = ""
  }

  //get deck from database
  this.deck = DeckFactory.get({name: $stateParams.name}, (res)=>{
    $scope.percentage = percentLearned(this.deck)
    this.startQuiz()
  })

  this.startQuiz = function(){
    $scope.sessionArray = startQuiz(this.deck.cards)
    this.nextQuestion($scope.sessionArray)
  }

  this.nextQuestion = function(sessionArray){
    question = sessionArray[Math.floor(Math.random() * sessionArray.length)]
    $scope.query = question.original
    $scope.actualAnswer = question.translation
  }


  this.answerQuestion = function(){
    //if user input is correct
    if ($scope.userAnswer.toUpperCase() == $scope.actualAnswer.toUpperCase()){

      // renderer.setClearColor(0x186DF1);
      // window.setTimeout(returnColor, 200);

      //display message to user
      $scope.message = "Correct!"
      window.setTimeout(clearMessage, 100);
      //increase session score
      $scope.score += 1
      //increase speed of cube
      increaseSpeed()
      //set card to learned in database
      this.deck.cards[this.deck.cards.indexOf(question)].learned = true
    }else{
      // renderer.setClearColor(0x832123);
      // window.setTimeout(returnColor, 200);

      $scope.message = "Incorrect : ("
      window.setTimeout(clearMessage, 100);

      //slow down the cube
      decreaseSpeed()
      //Set card to unlearned in database
      this.deck.cards[this.deck.cards.indexOf(question)].learned = false
    }

    //remove card from session deck
    $scope.sessionArray.splice($scope.sessionArray.indexOf(question),1)

    //if 0 cards in session, end the quiz
    if($scope.sessionArray.length == 0){
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
      this.nextQuestion($scope.sessionArray)
    }
  }
  hideFooter=false
  correctMessage = false
}
