startQuiz = function(deck, $scope){
  speed = 0.01
  let placeHolderArray = []

  quizArray = placeHolderArray.concat(deck.cards)
  randomNumber = Math.floor(Math.random() * quizArray.length)
  question = quizArray[randomNumber]

  cheeseburger = question.original
  scope.answer = question.translation
}
