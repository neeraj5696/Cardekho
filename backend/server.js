const express = require("express");
const { MongoClient } = require("mongodb"); 
const authRoutes = require('./routes/auth');
const cors = require("cors");

const uri = "mongodb+srv://neerajkumar5696:a8QOGFvjlD9T3F7y@cluster0.sw64i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 

const client = new MongoClient(uri, { tlsInsecure: false });

const app = express();
app.use(express.json());

app.use(cors());

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("carDatabase"); 
    const carsCollection = db.collection("cars");

    // Modified route to handle pagination
    app.get("/cars", async (req, res) => {
      try {
        const limit = parseInt(req.query.limit) || 20; // Number of records to fetch, default to 20
        const page = parseInt(req.query.page) || 0; // Page number, default to 0 (first page)
        
        // Calculate the number of documents to skip
        const skip = page * limit;
        
        // Fetch cars with pagination
        const cars = await carsCollection.find({})
                                         .skip(skip)
                                         .limit(limit)
                                         .toArray();
        
        console.log(`Cars fetched from DB (Page: ${page}, Limit: ${limit}):`, cars);
        res.json(cars);
      } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
      }
    });

    //Mount the auth routes

    app.use("/api/auth", authRoutes);



    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } 
  catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

run().catch(console.error);
