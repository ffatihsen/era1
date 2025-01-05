const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser, loginUser, verifyToken } = require('../controllers/userController');


const {authChech} = require("../middleware/CheckAuth")

const validationHandler = require("../utils/validators")
const userValidator = require("../utils/validators/userValidator")


router.post('/', validationHandler(userValidator.createUser), createUser);
router.get('/:id', validationHandler(userValidator.getUser), getUserById);
router.put('/', authChech, validationHandler(userValidator.updateUser), updateUser);
router.delete('/', authChech, deleteUser);
router.post('/login', validationHandler(userValidator.loginUser), loginUser);
router.post('/verify', authChech,validationHandler(userValidator.verifyToken),  verifyToken);

module.exports = router;
