const express = require('express');
const router = express.Router();
const Person = require('./../models/Person.js')

router.post('/',async(req,res) =>{
    try{

        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log("Data Saved");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Servor Error"});
    }
})

router.get('/',async(req,res) =>{
    try{

        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch(err){

        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});

    }
})

router.get('/:workType',async(req,res) =>{
    try{

        const workType = req.params.workType;
    
        if(workType === 'chef' || workType === 'waiter' || workType === 'manager'){
             const response =  await Person.find({work : workType});
             console.log('response fetched');
             res.status(200).json(response);
        }else{
            res.status(404).json({error : 'Invalid Work type'})
        }


    }catch(err){
        
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
});

router.put('/:id', async(req,res) =>{
    try{

        const personId = req.params.id;
        const updatedData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedData);
        res.status(200).json(response);

        if(!response){
            res.status(400).json({error : "Person not found"});
        }

    }catch(err){
             
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
})

module.exports = router;