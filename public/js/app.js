angular
.module("cards", [
  "ui.router",
  "ngResource",
])
.config([
  "$stateProvider",
  Router,
])

function Router($stateProvider){
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
  .state("quiz",{
    url:"/decks/:name/quiz",
    templateUrl:"./js/ng-views/quiz.html",
    controller:"quizCtrl",
    controllerAs:"vm"
  })
}
