const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes")

const sequelize = require("./config/databaseconfig")
const {User} = require("./models/user")


const app = express()
app.use(cors())
app.use(express.json({limit:"2mb"}))
app.use(express.urlencoded({limit:"2mb", extended:true}))

const PORT = process.env.PORT || 8080

app.use("/", routes);



sequelize.authenticate()
.then(() => {console.log("Database connection successful");})
.catch((error) => {console.log("Database connection failed :",error);})




sequelize.sync({alter:true}) // {force : true} yerine alter kullanarak veritabanını güncel tutabiliriz
.then(() => {console.log("Models synced with database");})
.catch((error) => {console.log("Error during model synchronization:",error);})





app.listen(PORT, () => {
    console.log(`The server is running successfully at ${PORT}.`);
})