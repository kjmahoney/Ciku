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
    this.percentLearned()
  })

  this.percentLearned= function(){
    //placeholder
    let learned = []
    //for each card in the deck where learned is true, place into learned array
    for (i =0; i <this.deck.cards.length; i++){
      if(this.deck.cards[i].learned){
        learned.push(this.deck.cards[i])
      }
    }
    //calculate percentage of cards learned to the cards in the deck
    $scope.percentage = Math.ceil(((learned.length/this.deck.cards.length)*100))

    //total number of cards in deck
    $scope.number = this.deck.cards.length
  }


  // $scope.query = "Click screen above to begin"
  this.startQuiz = function(){
    speed = 0.01
    let placeHolderArray = []
    quizArray = placeHolderArray.concat(this.deck.cards)
    randomNumber = Math.floor(Math.random() * quizArray.length)
    question = quizArray[randomNumber]
    $scope.query = question.original
    $scope.answer = question.translation
  }


  this.answerQuestion = function(){
    console.log($scope.answer)
    //user input is that same as the
    if ($scope.userAnswer.toUpperCase() == $scope.answer.toUpperCase()){
      //increase score, speed, and set card to learned in database
      quizArray.splice(quizArray.indexOf(question),1)
      $scope.score += 1
      speed = ($scope.score/10)
      this.deck.cards[randomNumber].learned = true
      this.deck.$update({name: $stateParams.name})
      console.log(this.deck.cards[randomNumber].learned)

      if (quizArray.length == 0){
        this.deck.cards[randomNumber].learned = true
        this.deck.$update({name: $stateParams.name}).then($state.go("show", {name: $stateParams.name}))
        alert("You've completed the deck with a score of" + " " + $scope.score)

      }else{

      //update changes in database
      this.deck.$update({name: $stateParams.name})

      //reset for next question
      randomNumber = Math.floor(Math.random() * quizArray.length)
      question = quizArray[randomNumber]
      $scope.query = question.original
      $scope.answer = question.translation
      $scope.userAnswer=""
    }
    }else{
      //Set learned status of card to false and update database
      this.deck.cards[randomNumber].learned = false
      this.deck.$update({name: $stateParams.name})
      console.log(this.deck.cards[randomNumber].learned)


      //Session score reduced by one
      $scope.score -= 1
      speed = 0
      quizArray.splice(quizArray.indexOf(question),1)

      if (quizArray.length == 0){
        this.deck.cards[randomNumber].learned = false
        this.deck.$update({name: $stateParams.name}).then($state.go("show", {name: $stateParams.name}))
        alert("You've completed the deck with a score of" + " " + $scope.score)
      }else{
      randomNumber = Math.floor(Math.random() * quizArray.length)
      question = quizArray[randomNumber]
      $scope.query = question.original
      $scope.answer = question.translation
      $scope.userAnswer=""
    }
    }

  }
  hideFooter=false
}
