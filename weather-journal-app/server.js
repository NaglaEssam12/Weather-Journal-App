// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port,listening);
function listening()
{
    console.log("The server is running");
    console.log(`running on localhost: ${port}`);
}

app.post('/addWeather',addWeather);

function addWeather(req,res)
{
    //console.log(req.body);
    newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        entry: req.body.dataEntry
    };
    projectData.push(newEntry);
    res.send(projectData);
    console.log(projectData);
    return projectData;
}
//To show all routes
app.get('/route', sendData);

function sendData (request, response) {
  response.send(projectData);
};