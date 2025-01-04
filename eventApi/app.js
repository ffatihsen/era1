const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/database.config");
const routes = require("./routes");



const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};


const app = express();


app.use(cors(corsOptions));
app.use(express.json({limit:"2mb"}))
app.use(express.urlencoded({limit:"2mb", extended:true}))





const PORT = process.env.PORT || 8081;



app.use("/", routes);






async function startServer() {
    try {
        await db.connectToDatabase();
        app.listen(PORT, () => { 
            console.log(`${PORT} portu çalışıyor..`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
    }
}

startServer();
