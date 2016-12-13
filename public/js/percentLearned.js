this.percentLearned= function(deck){
  //placeholder
  let learned = []
  //for each card in the deck where learned is true, place into learned array
  for (i =0; i <deck.cards.length; i++){
    if(deck.cards[i].learned){
      learned.push(deck.cards[i])
    }
  }
  //calculate percentage of cards learned to the cards in the deck
  return percentage = Math.ceil(((learned.length/deck.cards.length)*100))
}

this.cardsLength= function(deck){
  return number = deck.cards.length
}
