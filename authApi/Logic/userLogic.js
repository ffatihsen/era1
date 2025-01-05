const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserLogic = async (username, email, password) => {
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashPass });
    return newUser;
};

const getUserByIdLogic = async (id) => {
    return await User.findByPk(id);
};

const updateUserLogic = async (id, username) => {
    const user = await User.findByPk(id);
    if (!user) {
        return null;
    }
    user.username = username;
    await user.save();
    return user;
};

const deleteUserLogic = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        return false;
    }
    await user.destroy();
    return true;
};

const loginUserLogic = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('User not found');
    }

    return jwt.sign(
        { userId: user.id, userName: user.username },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    );
};

module.exports = {
    createUserLogic,
    getUserByIdLogic,
    updateUserLogic,
    deleteUserLogic,
    loginUserLogic,
};
