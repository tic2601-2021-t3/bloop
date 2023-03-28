require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json()); 
module.exports = app;
/* 
*** what is app.use(express.json())
When a client sends a request to your server with a JSON payload in the request body, Express does not automatically parse the request body as JSON. Instead, you need to use middleware to parse the JSON and make it available to your application.

express.json() is a built-in middleware function in Express that does exactly this. When you call app.use(express.json()), you are telling Express to use this middleware function for all incoming requests to your application.

This middleware function parses the JSON payload in the request body and adds the parsed JSON object to the req.body property of the request object. This allows you to access the parsed JSON data in your route handlers. 

Note: In earlier versions of Express, you would need to use the body-parser middleware to parse the request body. However, since version 4.16, Express has its own built-in middleware for parsing JSON request bodies called express.json(). This middleware is based on the body-parser library and is included by default when you create an Express application using the express() function.

*** what is app.use()
In an Express application, app.use() is a method used to mount middleware functions at a specified path.

"mounting" a middleware function means attaching it to the application's request handling pipeline. When a client sends a request to the server, the request is processed by a series of middleware functions in a particular order, with each function potentially modifying the request or response objects before passing them to the next function in the chain. Middleware functions can be mounted at specific routes or at the root of the application, where they will be executed for every incoming request.

For example, if your Express application is running on http://localhost:3000, the root path would be '/'.

When a client sends a request to the root path of an Express application, the application's request handling pipeline is triggered and any middleware functions or route handlers that are mounted at the root path will be executed. 

Note: When the middleware function is mounted with no specific path argument, it will be applied to all incoming requests for all routes.
As such, in app.use(express.json()), the middleware function is mounted to the root path.
*/

// starts an HTTP server listening on port 3000, and logs a message to the console to indicate that the server has started.
app.listen(3001, () => { 
    console.log(`Server Started at ${3001}`) 
})

const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const routes = require('./routes/routes');
app.use('/api', routes) 
/* In the case of app.use('/api', routes), the function routes is added as middleware to the application, 
   and is executed on all incoming requests to URLs that begin with the /api path prefix */

const path = require('path');
app.use(express.static(path.resolve(__dirname, '../spa/build')));
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });