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
app.use(parser.json({extended:true}));

//Route to home/index to display all decks
app.get("/", (req,res)=>{
  res.render('layout', {})
})

app.get("/api/decks", (req,res)=>{
  Deck.find({}).then(decks =>{
    res.json(decks)
  })
})

app.post("/api/decks",(req,res)=>{
  Deck.create(req.body).then(deck =>{
    res.json(deck);
  })
})


app.get("/api/decks/:name", function(req, res){
  Deck.findOne({name: req.params.name}).then(function(deck){
    res.json(deck);
  });
});

app.get("/quiz", (req,res)=>{
  Deck.find({}).then(decks =>{
    res.render("quiz",{
      decks: decks
    })
  })
})

app.put("/api/decks/:name", function(req, res){
  Deck.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then(function(deck){
    res.json(deck)
  });
});


app.delete("/api/decks/:name", function(req, res){
  Deck.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({ success: true })
  });
});


app.listen(app.get("port"), function(){
  console.log("Listening on 4002")
})
