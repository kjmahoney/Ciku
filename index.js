var mongoose      = require("./db/connection")
var models        = require("./db/models")
var express       = require("express")
var parser        = require("body-parser")
var hbs           = require ("hbs")
var Deck          = mongoose.model("Deck")
var Card          = mongoose.model("Card")
var app           = express()

//Sets and uses
app.set("port", process.env.PORT || 4002)
app.set("view engine", "hbs")
app.use(express.static("public"));

//Route to home/index to display all decks
app.get("/", (req,res)=>{
  console.log("I used to be like you")
  Deck.find({}).then(decks =>{
    res.render("index",{
      decks: decks
    })
  })
})

app.get("/quiz", (req,res)=>{
  console.log("I used to be like you")
  Deck.find({}).then(decks =>{
    res.render("quiz",{
      decks: decks
    })
  })
})


app.listen(app.get("port"), function(){
  console.log("consequences")
})
