const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB connection setup
const url = 'mongodb://localhost:27017';
const dbName = 'student_info';

let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    db = client.db(dbName);
    console.log('Connected to MongoDB!');
});

// Route to get all students
app.get('/students', (req, res) => {
    const collection = db.collection('students');
    collection.find({}).toArray((err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.json(result);
        }
    });
});

// Route to insert a new student
app.post('/students', (req, res) => {
    const { name, age } = req.body;
    const collection = db.collection('students');
    collection.insertOne({ name, age }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.status(201).send('Student added');
        }
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
