const express= require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose') 
const path = require('path')

const port= process.env.PORT || 3000

var app= express()

app.use(bodyParser.json())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb+srv://piyush28:piyush94145@cluster0.jhrdy.mongodb.net/GitProfileDemo');

var db= mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("Connection Succeeded");
})

app.post('/sign_up', function(req, res){
    var name= req.body.name;
    var email= req.body.email;
    var pass= req.body.password;
    var phone= req.body.phone;

    var data= {
        "name": name,
        "email": email,
        "password": pass,
        "phone": phone
    }

    db.collection('details').insertOne(data, function(err, collection){
        if(err) throw err;
        console.log("Record Inserted Successfully");
    });

    return res.sendFile(path.join(__dirname, 'public/signUp_success.html'))

})


app.post('/login', function(req, res){
    var email_check= req.body.email;
    var pass_check= req.body.password;
    
    console.log(email_check)
    console.log(pass_check)

    db.collection('details').find( {"email": email_check, "password": pass_check} ).toArray(function(err, result){
        if(err) throw err;
        console.log(result);

        if (result.length == 0) {
            return res.sendFile(path.join(__dirname, 'public/login_unsuccessfull.html'))
        }
    
        else{
            return res.sendFile(path.join(__dirname, 'public/login_success.html'))
        }
    });

})

app.get('/', function(req, res){
    res.set({
        'Access-Control-Allow-Origin': '*'
    });

    res.sendFile(path.join(__dirname, ('public/index.html')))
})

app.get('/gitPage', function(req, res){
    res.sendFile(path.join(__dirname, ('public/gitPage.html')))
})

app.listen(port, ()=>{
    console.log(`Server Listening on port: ${port}`)
})