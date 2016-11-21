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

  function Router($stateProvider){
    console.log("router working")
    $stateProvider
    .state("index",{
      url: "/",
      templateUrl :"./js/ng-views/index.html",
    })
  }
