const express = require('express');
const router = express.Router()
const Model = require('../model/model');
const redis = require('redis'); // redis implementation
const client = redis.createClient(); // redis implementation
const bcrypt = require('bcrypt'); // Authentication and Authorisation implementation
const jwt = require('jsonwebtoken');
const { Data, User } = require('../model/model'); // Authentication and Authorisation implementation
const { generateAccessToken, authenticateToken } = require('../middleware/auth'); // Require the authentication middleware


// #region Simple Endpoints
router.get('/simpleGET', (req, res) => {
    res.status(200).send({message: "You got nothing 🔮"}) //response will send a status 200 and will also send a json object that has a key-value pair
})

router.post('/simplePOST', (req, res) => {
    res.status(200).send({message: "You posted nothing 🔮"}) 
})

router.put('/simplePUT', (req, res) => {
    res.status(200).send({message: "You placed nothing 🔮"}) 
})

router.delete('/simpleDELETE', (req, res) => {
    res.status(200).send({message: "You deleted nothing 🔮"}) 
})
// #endregion

// #region Database Endpoints
router.post('/post', async (req, res) => {
    const data = new Data({
      food: req.body.food,
      qty: req.body.qty
    });
  
    try {
      const newData = await data.save();
      res.status(201).json(newData);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});
  
/*
router.post('/post', async (req, res) => {
    const data = new Model({
        food: req.body.food,
        qty: req.body.qty
    })
    
    try {
        const savedData = await data.save();
        res.status(200).json(savedData)
        done(); 
    }
    catch (error) {
        res.status(400).send({message: error.message}) 
    }
})*/

router.get('/getAll', async (req, res) => {
    
    try{
        // Check if the data is already cached in Redis
        client.get('getAll', async (err, cachedData) => {
            if (cachedData) {
                res.status(200).json(JSON.parse(cachedData)); // If the data is already cached in Redis, return it
            } else {
                const data = await Data.find(); // If the data is not cached in Redis, fetch it from MongoDB
                client.setex('getAll', 10, JSON.stringify(data)); // Cache the response in Redis for 10 seconds
                res.status(200).json(data);
                done();
            }
        });
        
    }
    catch(error){
        res.status(500).send({message: error.message}) 
    }

    try{
        const data = await Data.find();
        res.status(200).json(data)
        done();
    }
    catch(error){
        res.status(500).send({message: error.message}) 
    }
})

router.get('/get/:id', async (req, res) => { 
    try{
        const data = await Data.findById(req.params.id);
        res.status(200).json(data)
        done();
    }
    catch(error){
        res.status(500).send({message: error.message}) 
    }
})

router.delete('/deleteALL', async (req, res) => {
    try {
        const data = await Data.deleteMany();
        res.status(200).send(`All data has been deleted 🔮`) 
        done();
    }
    catch (error) {
        res.status(500).send({message: error.message}) 
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Data.findByIdAndDelete(id)
        res.status(200).send(`${data.food} has been deleted 🔮`) // ${data.name} is a template literal that is used to dynamically insert the value of the name property of the data object into the string. Template literals are a new feature introduced in ECMAScript 6 (ES6) that allows you to create strings that can contain placeholders for variables or expressions. Template literals are enclosed in backticks (`) instead of single or double quotes.
        done();
    }
    catch (error) {
        res.status(500).send({message: error.message}) 
    }
})

router.put('/put/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Data.findByIdAndUpdate(id, { "food": req.body.food, "qty": req.body.qty})
        res.status(200).send(`Your entry has been updated 🔮`)
        done();
    }
    catch (error) {
        res.status(500).send({message: error.message}) 
    }
})
// #endregion

// #region Authentication and Authorisation Endpoints
// User registration endpoint
router.post('/register', async (req, res) => {
    try {
      // Check if user with given email already exists
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash the password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
      // Create new user in database
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
        roles: req.body.roles
      });

      const savedUser = await user.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
// User login endpoint
router.post('/login', async (req, res) => {
    try {
      // Find user with given email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email' });
      }  
      // Check if password is correct
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (passwordMatch) {
        // Create and sign JWT token
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
      } else {
        return res.status(401).json({ error: 'Invalid password' });
      }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Protected route that requires authentication
/*
router.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route 🔮 If you are seeing it, it means you have access to this route');
});
*/
router.get('/protected', authenticateToken, async (req, res) => {
    // Extract token from request header
    const token = req.headers.authorization.split(' ')[1]; 
    
    // check if a token was provided
    if (!token) { 
        return res.status(401).json({ error: 'No token provided 🔮' });
    }

    // if token was provided, verify and decode token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); 
    
    // Once token is decoded, extract userID and retrieve user from mongoDB
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    const userRole = user.roles; // retrieve user role 
    if (userRole.includes('admin')) { 
        res.status(200).send('Welcome Admin! 🔮 If you are seeing it, it means you have access to this route'); // Return a 200 OK response if the user is an admin
    } else {
        return res.status(403).json({ error: 'Opps! Only admins can access this route 🔮' }); // Return a 403 Forbidden error if the user is not an admin
    }
  });
// #endregion

module.exports = router;

/**
 * Key Learnings:
 * 
 * --What is "async"--
 * An asynchronous operation is an operation that does not block the execution of the program while it is being performed. 
 * In other words, it allows the program to continue executing while the operation is being processed in the background.
 * In contrast, a synchronous operation is an operation that blocks the execution of the program until it is complete. 
 * The program cannot continue executing until the operation has finished.
 * In JavaScript, common examples of asynchronous operations include making HTTP requests, 
 * reading and writing files, and interacting with databases. When performing these operations, 
 * the program does not wait for the operation to complete before moving on to the next line of code. 
 * Instead, it continues executing other code until the operation is finished.
 * Asynchronous operations are often used in programming to improve the performance of a program 
 * by allowing it to perform multiple tasks simultaneously. 
 * 
 * --What is ":id"--
 * Let's take this endpoint as an example: router.get('/get/:id', async (req, res) => { . . . }) 
 * :id is a URL parameter that is used to capture a dynamic value from the URL.
 * 
 * In the /login endpoint, we will first check if the user with the given email exists in the database. 
 * If the user exists, we will then check if the password matches using bcrypt. 
 * If the password is correct, we will generate a JWT token using jwt.sign() 
 * and return it in the response.
 * 
 * In the /register endpoint, we will first check if the user with the given email 
 * already exists in the database. 
 * If the user does not exist, we will hash the password using bcrypt 
 * and create a new user in the database. 
 * We will then generate a JWT token using jwt.sign() 
 * and return it in the response.
 * */ 

