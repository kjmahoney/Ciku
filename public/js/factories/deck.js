angular.module("cards")
.factory("Deck",[
  "$resource",
  Callback,
])


function Callback($resource){
  // return {
  //   hello(){
  //     console.log("hello world")
  //   }
  //
  // }

  $resource("/api/decks/:name", {}, {
    update: { method: "PUT" }
  });
}
