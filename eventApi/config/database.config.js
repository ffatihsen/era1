const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let connectionString = process.env.DB_URI


async function connectToDatabase() {
    try {
        await mongoose.connect(connectionString, { useNewUrlParser: true });
        console.log("DB Connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

module.exports = {
    connectToDatabase
};


