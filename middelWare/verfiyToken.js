const jwt = require('jsonwebtoken');
require('dotenv').config();
const Userdetail = require('../model/userModel');

const secretkey = process.env.secretkey;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  console.log("Token received in headers:", token);

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, secretkey);
    console.log("Decoded token:", decoded);

    const user = await Userdetail.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.userId = user._id;
    next();
  } catch (e) {
    console.error("JWT Verification Error:", e);
    res.status(401).json({ errorMessage: 'Invalid token' });
  }
};

module.exports = verifyToken;
