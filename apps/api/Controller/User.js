const User = require('../Model/User')
const jwt = require('jsonwebtoken')

async function AddUser(req,res) {
    try {
        const { email, password } = req.body;
        const newUser = new User({
          email,
          password
        })
      const result = await newUser.save();
      res.status(201).json({
        message: 'User Created',
        data: result
      })
    } catch (error) {
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
          })
    }
}

const JWT_SECRET = process.env.JWT_SECRET;
const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const isPasswordValid = await User.findOne({ password });
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Error in logging in the user', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {AddUser, LoginUser}