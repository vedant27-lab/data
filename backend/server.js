const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'student_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Create the student table if it doesn't exist
db.query(
  `CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    studentClass VARCHAR(255)
  )`,
  (err) => {
    if (err) throw err;
    console.log('Student table created or already exists');
  }
);

// API to add a student
app.post('/students', (req, res) => {
  const { name, age, studentClass } = req.body;
  const query = 'INSERT INTO students (name, age, studentClass) VALUES (?, ?, ?)';
  db.query(query, [name, age, studentClass], (err, result) => {
    if (err) {
      console.error('Error adding student:', err);
      return res.status(500).send('Server error');
    }
    res.send('Student added successfully');
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
