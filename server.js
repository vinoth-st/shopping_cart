var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

var app = express();
app.use(bodyParser.json());
const PORT = 3000;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shopping_cart', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


// Routes
app.use('/api/users', userRoutes);


// set the view engine to ejs
app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});