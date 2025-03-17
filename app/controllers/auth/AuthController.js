const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('@models/User');
const config = require('@config/config');

class AuthController {
    static async register(req, res) {
        return res.render("auth/register", { title: "Register Page" });
    }

    static async authregister(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) return res.status(400).json({ error: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ userId: user.id }, config.APP.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ error: 'Error logging in' });
        }
    }

    static async login(req, res) {
        return res.render("auth/login", { title: "Login Page" });
    }

    static async authlogin(req, res) {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashedPassword });

            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            res.status(500).json({ error: 'Error registering user' });
        }
    }
}

module.exports = AuthController;
