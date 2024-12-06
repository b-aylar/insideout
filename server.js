const express = require('express'); // for node js
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// middleware to parse JSON
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
// serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// route for the main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// route for the serialdemo page
app.get('/serialdemo', (req, res) => {
  res.sendFile(__dirname + '/public/serialdemo.html');
});

// route for the quiz page
app.get('/quiz', (req, res) => {
  res.sendFile(__dirname + '/public/quiz.html');
});

// route to store data from the form
app.post('/quiz.html', (req, res) => {
  console.log(req.body); // Handle the submitted data
  res.send('Form submitted successfully!');
});


// route for the joy page
app.get('/joy', (req, res) => {
  res.sendFile(__dirname + '/public/joy.html');
});

// route for the sadness page
app.get('/sadness', (req, res) => {
  res.sendFile(__dirname + '/public/sadness.html');
});

// route for the anxiety page
app.get('/anxiety', (req, res) => {
  res.sendFile(__dirname + '/public/anxiety.html');
});

// route for the fear page
app.get('/fear', (req, res) => {
  res.sendFile(__dirname + '/public/fear.html');
});

// start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
