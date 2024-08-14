const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
    try {
        const { fn, confirmPassword, ln, number, email, password } = req.body;
        if (fn?.length < 2) {
            return res.status(400).json({ title: "Bad Request", message: "fn should contain min 2 characters" });
        }
        if(password!==confirmPassword){
            return res.status(400).json({ title: "Bad Request", message: "password and confirmPassword do not match" });
        }
        const hashedPassword =  await bcrypt.hash(password, 10);
        const hashedCPassword = await bcrypt.hash(confirmPassword, 10);
       let data= await User.create({ fn, password:hashedPassword, ln, number, email, confirmPassword:hashedCPassword });
        res.status(201).json({ message: "User added successfully" ,data:data});
    } catch (err) {
        console.error("Error during user creation:", err);

        if (err.name === 'MongoServerError' && err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({ title: "Duplicate Key Error", message: `${field} already exists` });
        }

        res.status(500).json({ title: "Internal Server Error", message: "An unexpected error occurred" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username) {
            return res.status(400).json({ error: true, message: "Username is required" });
        }

        const user = await User.findOne({ email: username });
        if (!user) {
            return res.json({ error: true, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ error: true, message: "Incorrect password" });
        }

        res.json({ error: false, message: "User fetched successfully", data: user, token: req.token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: err });
    }
};


const logout = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    try {
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const authorize = (req, res) => {
    res.status(200).json({ message: 'Into the Home Page successfully' });
};

module.exports = { register, login, logout, authorize };
