const express = require('express');
const router = express.Router();
const { register, login,logout,authorize} = require('../controllers/authController');
const { generateToken , authenticateToken } = require('../middlewares/authMiddleware');
const algorithm = 'aes-256-ctr';

router.post('/register', register);
router.post('/login',generateToken,login);
router.post('/logout',authenticateToken,logout)
router.post('/authorize',authenticateToken,authorize)



module.exports = router;
