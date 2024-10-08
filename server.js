const express = require('express');
const app = express();
const db = require('./db.js')
const Person = require('./models/Person');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const menuItem = require('./models/Menu.js')

app.get('/', function(req,res){
    res.send("Hello Welcome To The Hotel");
})



app.post('/menu',async(req,res) =>{
    try{

        const data = req.body;
        const newMenu = new menuItem(data);
        const response = await newMenu.save();
        res.status(200).json(response);

    }catch(err){

        console.log(err);
        res.status(500).json({error : "Internal Servor Error"});

    }
})


app.get('/menu',async(req,res) =>{
    try{

        const data = await menuItem.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch(err){

        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});

    }
})

const personRoutes =  require('./routes/personRoutes.js')
const menuRouter = require('./routes/menuRoutes.js');

app.use('/person',personRoutes)
app.use('/menu',menuRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,() =>{
    console.log('Server is Running')
});