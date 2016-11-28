//Render a random character from the deck onto the page
//Find a way to capture a value from the input box
//Use quiz functionality to compare these

//Create score keeping functionality

//fix links between pages

//Constant variables
let answerBox =document.getElementById('answerBox')
let submitButton =document.getElementById('submitButton')
let questionBox = document.getElementById('questionBox')


quiz = function(){
  question = deck.cards[Math.floor(Math.random() * deck.cards.length)]
  questionBox.textContent = question.original
  console.log(question.correct)
}

//if no input alert the user
check = function(){
  if (questionBox.textContent == "Click to Start"){
    alert("Start the quiz before clicking this fuckin button")
  }else{
    //if correct, alert user, mark card as correct, and move to next card
    if (answerBox.value.toUpperCase() == question.translation.toUpperCase()){
      alert("Correct!")
      quiz()
      answerBox.value = ""
      question.correct = true
      //if incorrect alert user and move on
    }else{
      alert("Incorrect!")
      quiz()
    }
  }
}

//Event listeners
questionBox.onclick = quiz
submitButton.onclick = check
