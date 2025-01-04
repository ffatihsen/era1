const User = require('../models/user');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashPass = await bcrypt.hash(password, 10);

        if (!username) {
            return res.status(400).json({ error: 'username is required.' });
        }

        const newUser = await User.create({ username: username, email:email,  password: hashPass  });
        res.status(201).json({ message: 'User created successfully.', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user.' });
    }
};


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Error fetching user.' });
    }
};


const updateUser = async (req, res) => {
    try {
        const id = req.user?.userId;
        const { username } = req.body;
    

        // Güncellenecek kullanıcı adı kontrolü
        if (!username) {
            return res.status(400).json({ error: 'Username is required.' });
        }

        // Kullanıcıyı ID ile bul
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Kullanıcıyı güncelle
        user.username = username;
        await user.save(); // Veritabanına değişiklikleri kaydet

        res.status(200).json({ message: 'User updated successfully.', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user.' });
    }
};


const deleteUser = async (req, res) => {
    try {
        const id = req.user?.userId;

        // Kullanıcıyı ID ile bul
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Kullanıcıyı sil
        await user.destroy();

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user.' });
    }
};


const loginUser = async(req,res) => {
    try {
        const {email,password} = req.body


        const users = await User.findOne( {where:{email:email}})

        if(!users || !bcrypt.compare(users.password, password)){
            return res.status(404).json({ error: 'User not found.' });
        }

        const token = jwt.sign({userId: users.id, userName:users.username}, process.env.SECRET_KEY, {expiresIn:"1h"} )

        return res.status(200).json({token})

    } catch (error) {
        console.log("error:",error);
        return res.status(500).json({message:"UnExpected Error"})
    }


}


const verifyToken = async(req,res) => {
    try {
        const {userId, userName} = req.user
        return res.status(200).json({userId, userName})

    } catch (error) {
        console.log("error:",error);
        return res.status(500).json({message:"UnExpected Error"})
    }


}


module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    verifyToken
};
