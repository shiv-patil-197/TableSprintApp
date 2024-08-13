const jwt = require('jsonwebtoken');

let generateToken = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const payload = { email, password };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
    if (!token) {
      return res.json({ message: "Token not generated" });
    }
    req.token = token;
  } catch (err) {
    console.error('Token Generation Error:', err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  next();
};

let authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace(/Bearer /i, '');
  console.log(token);

  if (!token || token==="null") {
    return res.status(401).json({ message: 'Unauthorized: please log in' });
  }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT Error:', err.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      console.log(decoded);
      req.decoded = decoded;
      next();
    });
};

module.exports = { generateToken, authenticateToken };
