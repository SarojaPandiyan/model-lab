const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login_signup_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:',err);
    return;
  }
  console.log('Connected to MySQL');
});

app.post('/signup',(req,res) => {
  const { username,email,password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query,[email],(err,results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

    const insertQuery = 'INSERT INTO users (username,email,password) VALUES (?,?,?)';
    db.query(insertQuery,[username,email,password],(err,results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

app.post('/login',(req,res) => {
  const { email,password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query,[email],(err,results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0 || results[0].password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  });
});

app.listen(3000,() => console.log('Server running on port 3000'));
