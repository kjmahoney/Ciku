startQuiz = function(){
  placeHolderArray = []
  quizArray = placeHolderArray.concat(this.deck.cards)
  randomNumber = Math.floor(Math.random() * quizArray.length)
  let question = quizArray[randomNumber]
  $scope.query = question.original
  $scope.answer = question.translation
}
