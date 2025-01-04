const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser, loginUser, verifyToken } = require('../controllers/userController');


const {authChech} = require("../middleware/CheckAuth")



router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/', authChech, updateUser);
router.delete('/', authChech, deleteUser);
router.post('/login', loginUser);
router.post('/verify', authChech, verifyToken);

module.exports = router;
