console.log("app.js connected")

angular
  .module("cards", [
    "ui.router",
    "ngResource",
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("Deck",[
    "$resource",
    Deck
  ])
  .controller("indexCtrl",[
    "Deck",
    indexController
  ])

  function Router($stateProvider){
    console.log("router working")
    $stateProvider
    .state("index",{
      url: "/",
      templateUrl :"./js/ng-views/index.html",
      controller: "indexCtrl",
      controllerAs:"vm"
    })
  }

 function Deck($resource){
   var Deck = $resource("/", {}, {
     update: {method: "GET"}
     console.log("Deck")
   });
   return Deck;
 }

  function indexController(Deck){
    console.log("controller working")
    this.decks = Deck.query()
  }
