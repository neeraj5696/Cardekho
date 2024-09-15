const { MongoClient } = require("mongodb");
const fs = require("fs");

// MongoDB connection string


const uri = "mongodb+srv://neerajkumar5696:a8QOGFvjlD9T3F7y@cluster0.sw64i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI

const client = new MongoClient(uri, { tlsInsecure: false });

const dbName = "carDatabase"; // Replace with your database name
const collectionName = "cars"; // Replace with your collection name

async function importData() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Read the JSON file
    const jsonData = fs.readFileSync("car_data.json", "utf-8");
    const carDataArray = JSON.parse(jsonData);

    // Insert the data into the collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(carDataArray);
    console.log(`${result.insertedCount} documents were inserted`);

  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    // Close the connection
    await client.close();
  }
}

importData();