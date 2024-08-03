const User = require('../models/user')
const crypto = require('crypto');;
const jwt = require('jsonwebtoken');
const algorithm = 'aes-256-ctr';
const secretKey = 'VjYzZ3F5d6g7h8j0j2k5l7m1p0q3r5t7'; // Use a 32-byte key
const iv = crypto.randomBytes(16);
const redis = require('redis');
const client = redis.createClient();


 const register = async (req, res) => {
    try {
        let { fn, confirmPassword, ln, number, email, password } = req.body;
        if (fn?.length < 2) {
            return res.status(400).json({ title: "Bad Request", message: "fn should contain min 2 charcters" })
        }
        // const encryptedPassword = encrypt(password);
        await User.create({ fn, password, ln, number, email, confirmPassword });
        res.status(201).json({ message: "student added successfully" })

    }
    catch (err) {
        console.error("Error during user creation:", err); // Improved error logging

        // Check for duplicate key errors
        if (err.name === 'MongoServerError' && err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            console.log(Object.keys);
            return res.status(400).json({ title: "Duplicate Key Error", message: `${field} already exists` });
        }

        // Handle other errors
        res.status(500).json({ title: "Internal Server Error", message: "An unexpected error occurred" });
    }
}


const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrypted.toString();
};

const login = async (req, res) => {
    try {
        const { username ,password } = req.body 
        console.log(username);
        if (!username) {
            return res.status(400).json({ error: true, message: "Username is required" });
        }
        
        let  user = await User.findOne({ email: username });
    
        if (!user) {
            return res.json({ error: true, message: "User not found" });
        }
        // const decryptedPassword = decrypt(user.password);

        // if (password !== decryptedPassword) {
        //     return res.status(400).json({ message: "Invalid email or password" });
        // }
        res.json({ error: false, message: "User fetched successfully", data: user , token:req.token});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: err });
    }
};



const  logout=(req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    client.set(token, 'blacklisted', 'EX', 5); // Expire in 5 seconds

    res.status(200).json({ message: 'Logged out successfully' });
};

const authorize=(req, res)=>{
    res.status(200).json({ message: 'Into the Home Page successfully' }); 
}

module.exports = {register, login, logout ,authorize}