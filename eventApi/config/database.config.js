const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let connectionString = process.env.DB_URI;

async function connectToDatabase() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4
        });
        console.log("DB Connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

module.exports = {
    connectToDatabase
};
