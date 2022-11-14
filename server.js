// Setup empty JS object to act as endpoint for all routes, it's to store the data from the client-side
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder, it has the index.html,app.js and the CSS file
app.use(express.static('website'));


// Setup Server
const port = 8000;

// Start the server using the port we chose and a function to be called when the server starts
const server = app.listen(port, listening);

// For debugging
function listening() {
	console.log('server running');
	console.log(`running on localhost:${port}`);
}

// Initialize all route with a callback function and the route which is called 'all' 
app.get('/all', sendData);

// The callback function to GET 'all'
function sendData(req, res) {
	res.send(projectData);
    projectData = {}; // Clear the project data after each process to be replaced later on
}

// POST route, which sends data to the server
app.post('/add', addData);

function addData(req, res) {
    console.log(req.body); // Show received data in the console (for debugging purposes)
    projectData = req.body;
    res.send('Sent data');
}
