const express = require('express');
const router = express.Router();
const { sendEmail,  } = require('../controller/mailController');





router.post('/send', sendEmail);


module.exports = router;
