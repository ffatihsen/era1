const express = require("express");
const router = express.Router();

const mailRouter = require("./mailRouter")


router.use("/mail", mailRouter);


module.exports = router;