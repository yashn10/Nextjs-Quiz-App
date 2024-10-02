const mongoose = require('mongoose');
const DB = process.env.DB


const db = mongoose.connect(DB);
if (db) {
    console.log("database connected successfully");
} else {
    console.log("database connection failed");
}