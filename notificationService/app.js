const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes")


const app = express()
app.use(cors())
app.use(express.json({limit:"2mb"}))
app.use(express.urlencoded({limit:"2mb", extended:true}))

const PORT = process.env.PORT || 8082

app.use("/", routes);


app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found." });
});





app.listen(PORT, () => {
    console.log(`The server is running successfully at ${PORT}.`);
})