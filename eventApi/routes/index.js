const express = require("express");
const router = express.Router();


const eventRouter = require("./event");



router.use("/event", eventRouter);

module.exports = router;
