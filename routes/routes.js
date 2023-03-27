const express = require('express');
const Model = require('../model/model');
const router = express.Router()
module.exports = router;

router.get('/simpleGET', (req, res) => {
    res.status(200).send({message: "You got nothing 🔮"}) //response will send a status 200 and will also send a json object that has a key-value pair
})

router.post('/simplePOST', (req, res) => {
    res.status(200).send({message: "You posted nothing 🔮"}) 
})

router.put('/simplePUT', (req, res) => {
    res.status(200).send({message: "You placed nothing 🔮"}) //response will send a status 200 and will also send a json object that has a key-value pair
})

router.delete('/simpleDELETE', (req, res) => {
    res.status(200).send({message: "You deleted nothing 🔮"}) 
})

router.post('/post', async (req, res) => {
    const data = new Model({
        food: req.body.food,
        qty: req.body.qty
    })
    
    try {
        const savedData = await data.save();
        res.status(200).json(savedData)
    }
    catch (error) {
        res.status(400).send({message: error.message}) 
    }
})
/*
An asynchronous operation is an operation that does not block the execution of the program while it is being performed. In other words, it allows the program to continue executing while the operation is being processed in the background.

In contrast, a synchronous operation is an operation that blocks the execution of the program until it is complete. The program cannot continue executing until the operation has finished.

In JavaScript, common examples of asynchronous operations include making HTTP requests, reading and writing files, and interacting with databases. When performing these operations, the program does not wait for the operation to complete before moving on to the next line of code. Instead, it continues executing other code until the operation is finished.

Asynchronous operations are often used in programming to improve the performance of a program by allowing it to perform multiple tasks simultaneously. 
*/

router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).send({message: error.message}) 
    }
})

router.get('/get/:id', async (req, res) => { // :id is a URL parameter that is used to capture a dynamic value from the URL.
    try{
        const data = await Model.findById(req.params.id);
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).send({message: error.message}) 
    }
})

router.delete('/deleteALL', async (req, res) => {
    try {
        const data = await Model.deleteMany();
        res.status(200).send(`All data has been deleted 🔮`) // ${data.name} is a template literal that is used to dynamically insert the value of the name property of the data object into the string. Template literals are a new feature introduced in ECMAScript 6 (ES6) that allows you to create strings that can contain placeholders for variables or expressions. Template literals are enclosed in backticks (`) instead of single or double quotes.
    }
    catch (error) {
        res.status(500).send({message: error.message}) 
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.status(200).send(`${data.food} has been deleted 🔮`) // ${data.name} is a template literal that is used to dynamically insert the value of the name property of the data object into the string. Template literals are a new feature introduced in ECMAScript 6 (ES6) that allows you to create strings that can contain placeholders for variables or expressions. Template literals are enclosed in backticks (`) instead of single or double quotes.
    }
    catch (error) {
        res.status(500).send({message: error.message}) 
    }
})

router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndUpdate(id, { "food": req.body.food, "qty": req.body.qty})
        res.status(200).send(`Your entry has been updated 🔮`)
    }
    catch (error) {
        res.status(500).send({message: error.message}) 
    }
})

/*
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).send({message: error.message}) 
    }
})
*/