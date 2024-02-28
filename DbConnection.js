const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'shopping_cart';

// Function to establish database connection
async function connectToDatabase() {
  try {
    // Create a new MongoClient
    const client = new MongoClient(uri);

    // Connect to the MongoDB server
    await client.connect();

    console.log('Connected to MongoDB');
    
    // Return the database object
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Throw the error to handle it where the function is called
  }
}

// Export the function
module.exports = connectToDatabase;
