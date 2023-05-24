const express=require("express");
const path=require("path");
const fs=require("fs");
const mongoose=require("mongoose");
const app=express();
const port=80;

//connecting mongo server
mongoose.connect('mongodb://127.0.0.1:27017/DanceAcademy');


//creating schema

const contact=new mongoose.Schema({
    name :String,
    age :String,
    gender:String, 
    phone:String,
    email :String,
    country :String
});

//creating model

const con=mongoose.model('Contact',contact);
//serving static file

//Express Specific configuration
 
app.use('/static',express.static('static'));
app.use(express.urlencoded());



//set template engine as pug
// pug specific configuration
app.set('view engine','pug');
app.set('views',path.join(__dirname,'template'));

app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
})
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
})

app.get('/about',(req,res)=>{
    res.status(200).render('about.pug');
})

app.get('/services',(req,res)=>{
    res.status(200).render('services.pug');
})

app.get('/class',(req,res)=>{
    res.status(200).render('class.pug');
})
app.post("/contact",(req,res)=>{  
    var mydata=new con(req.body);
    mydata.save().then(()=>{
        res.send("Data Saved  Sucessfully");
    }).catch(()=>{
        res.status(400).send("Data Not Saved");
    })
    // res.status(200).render("contact.pug");
})

app.listen(port,()=>{
    console.log(`The Application Started Sucessfully on ${port}`);
})