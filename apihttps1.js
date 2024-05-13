const express = require('express');
const mysql = require('mysql');
const path = require('path'); // Import the path module

// CONFIG SSL
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/tpi.gap-wire.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/tpi.gap-wire.com/fullchain.pem')
};

const app = express();
const port = 443;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// connection pool
const conn = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'P@ssword1234',
    database: 'my_db',
    insecureAuth: true
});

// Get HTTP METHOD 
app.get('/RandomData', (req, res) => {
    conn.query('SELECT * FROM RandomData', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

// Start HTTPS server
https.createServer(options, app).listen(port, () => {
    console.log(`Server is running on port ${port}`);
});