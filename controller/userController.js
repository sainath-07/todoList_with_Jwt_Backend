const Userdetail = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretkey = process.env.secretkey;

const userRegistration = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await Userdetail.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "Email id already exists in database" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Userdetail({
            name,
            email,
            password: hashedPassword,

        });

        await newUser.save();


        res.status(201).json({ message: "User added successfully", newUser });
    } catch (error) {
        console.log(error, "catch block");
        res.status(500).json({ errorMessage: "Internal server error" });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Userdetail.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid Email or Password' });
        }

        const token = jwt.sign({ userId: user._id }, secretkey, { expiresIn: "1h" });
        res.status(200).json({
            success: 'Login is successful',
            token,
            userId: user._id,
            email
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
};

module.exports = {
    userRegistration,
    userLogin,
};
