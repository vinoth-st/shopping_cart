var express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const RegisterController = require('./controllers/RegisterController');

var app = express();


// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(express.static('public'));

const PORT = 3000;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shopping_cart', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/users', userRoutes);


// set the view engine to ejs
app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});