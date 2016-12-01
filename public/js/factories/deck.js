angular.module("cards")
.factory("DeckFactory",[
  "$resource",
  DeckFactoryFunction,
])

function DeckFactoryFunction($resource){
  return $resource("/api/decks/:name", {}, {
    update: { method: "PUT" }
  });
}
