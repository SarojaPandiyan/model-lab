const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Parse incoming JSON requests
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_user',      // Replace with your MySQL username
    password: 'your_mysql_password',  // Replace with your MySQL password
    database: 'task_manager'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL Database:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// API endpoints

// Get all tasks
app.get('/api/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// Add a new task
app.post('/api/tasks', (req, res) => {
    const task = {
        title: req.body.title,
        description: req.body.description,
        completed: false
    };
    connection.query('INSERT INTO tasks SET ?', task, (err, result) => {
        if (err) {
            console.error('Error adding task:', err);
            res.status(500).send(err);
            return;
        }
        res.json({ id: result.insertId });
    });
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const updates = req.body;
    connection.query('UPDATE tasks SET ? WHERE id = ?', [updates, req.params.id], (err) => {
        if (err) {
            console.error('Error updating task:', err);
            res.status(500).send(err);
            return;
        }
        res.sendStatus(200);
    });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    connection.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            console.error('Error deleting task:', err);
            res.status(500).send(err);
            return;
        }
        res.sendStatus(200);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
