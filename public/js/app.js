console.log("app.js connected")
//set up factory link, figure out why this page isn't being found
angular
  .module("cards", [
    "ui.router",
    "ngResource",
  ])
  .config([
    "$stateProvider",
    Router,
  ])
  .factory("DeckFactory",[
    "$resource",
    DeckFactoryFunction,

  ])
  .controller("indexCtrl", [
    "$state",
    "DeckFactory",
    indexController,
  ])
  .controller("showCtrl",[
    "$stateParams",
    "DeckFactory",
    "$state",
    "$scope",
    showController
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
    .state("show",{
      url:"/decks/:name",
      templateUrl:"./js/ng-views/show.html",
      controller:"showCtrl",
      controllerAs:"vm"
    })
  }

 function DeckFactoryFunction($resource){
   return $resource("/api/decks/:name", {}, {
       update: { method: "PUT" }
     });
     }

  function indexController($state, DeckFactory){
    console.log("index controller working")
    this.decks = DeckFactory.query();
    this.newDeck = new DeckFactory()
    this.create = function(){
      this.newDeck.$save().then(deck=>{
        $state.go("index", {}, { reload: true });
      })
    }
  }

  function showController($stateParams, DeckFactory, $state, $scope, $index){
    console.log("show controller working")
    this.deck = DeckFactory.get({name: $stateParams.name})

    this.update = function() {
      this.deck.$update({name: $stateParams.name})
      console.log($stateParams.name)
    }

    this.destroy = function () {
     this.deck.$delete({name: $stateParams.name}).then(function(){
       $state.go("index")
     })
  }

  this.createCard = function(){
    this.deck.cards.push({
      original: $scope.original,
      translation: $scope.translation,
      pronounciation:$scope.pronounciation,
      literal:$scope.literal,
      context:$scope.context,
    })
      this.deck.$update({name: $stateParams.name})
  }

  this.updateCard = function()

  Person.update({'items.id': 2}, {'$set': {
      'items.$.name': 'updated item2',
      'items.$.value': 'two updated'
  }}


  this.deleteCard = function(index){
    this.deck.cards.splice(index,1)
    this.deck.$update({name: $stateParams.name})
  }
}
