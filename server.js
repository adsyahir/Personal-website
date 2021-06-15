var express=require('express');
var bodyParser= require('body-parser');
var mongoose = require("mongoose")
const app = express()


app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({

    extended:true
}))

mongoose.connect('mongodb+srv://adsyahir:system@cluster0.jyeja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/personal-website')

var db=mongoose.connection;
db.on('error',()=> console.log.apply("Error in connection to Database"));
db.once('open',()=>console.log("Connected to Database"))

const notesSchema = {
    name:String,
    email:String,
    subject:String,
    message:String
}


const Note = mongoose.model("Note",notesSchema);
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){

    let newNote = new Note({
     name:req.body.name,
     email:req.body.email,
     subject:req.body.subject,
     message:req.body.message
    })

    newNote.save();
    res.redirect('/')
})

app.listen(3000,function(){
    console.log("servecr is running on 3000");
})
