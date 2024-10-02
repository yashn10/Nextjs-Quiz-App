const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config({path: './config.env'});

require('./db');
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000', 'https://nextjs-quiz-app-opal.vercel.app'],
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true // Enable credentials
}));

app.use(require('./routes'));

app.listen(5000, () => {
    console.log('Server running on port 5000')
});