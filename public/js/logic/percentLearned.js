percentLearned= function(deck){
  //placeholder array
  let learned = []
  //for each card in the deck where learned is true, place into learned array
  for (i =0; i <deck.cards.length; i++){
    if(deck.cards[i].learned){
      learned.push(deck.cards[i])
    }
  }
  //calculate percentage of cards learned to the cards in the deck
  if (deck.cards.length == 0){
  return percentage = 0
}else{
  return percentage = Math.ceil(((learned.length/deck.cards.length)*100))
}
}

//provide number of cards in the deck
cardsLength= function(deck){
  return number = deck.cards.length
}
