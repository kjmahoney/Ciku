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
  res.render('layout', {})
})

app.get("/api/decks", (req,res)=>{
  console.log("Express get")
  Deck.find({}).then(decks =>{
    res.json(decks)
    console.log(decks)
  })
})

app.get("/api/decks/:name", function(req, res){
  console.log("show api working")
  Deck.findOne({name: req.params.name}).then(function(deck){
    res.json(deck);
  });
});

app.post("/api/decks",(req,res)=>{
  Deck.create(req.body).then(candidate =>{
    res.json(candidate);
  })
})

app.get("/quiz", (req,res)=>{
  console.log("Quiz working")
  Deck.find({}).then(decks =>{
    res.render("quiz",{
      decks: decks
    })
  })
})


app.listen(app.get("port"), function(){
  console.log("Listening on 4002")
})
