const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('@config/config');
const User = require('@models/User');

class AuthController {
    static async register(req, res) {
        return res.render("auth/register", { title: "Register Page" });
    }

    static async authregister(req, res) {
        try {
            const username = req.body.username ?? null;
            const email = req.body.email ?? null;
            const contact = req.body.contact ?? null;
            const password = req.body.password ?? null;
            const confirmPassword = req.body.confirmPassword ?? null;
    
            // Check if all fields are present
            if (!username || !email || !contact || !password || !confirmPassword) {
                throw new Error(`All fields are required!`);
            }

            if (password !== confirmPassword) {
                throw new Error(`Password mismatch error!`);
            }
    
            // Check if user already exists
            const existingUser = await User.query().findOne({ where: { email } });
            if (existingUser) {
                throw new Error('Email already registered'); 
            }
            
            // Hash password and create user
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.query().create({ username: username, email: email, contact: contact, password: hashedPassword });
            res.status(200).json({ status: 'success', message: 'User registered successfully', redirectUrl: '/login', user });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
    
    static async login(req, res) {
        const session = req.session.user;  
        return res.render("auth/login", { title: "Login Page", session: session });
    }

    static async authlogin(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new Error(`Check your Username and Password, & try again!`);
            }

            const user = await User.query().findOne({ where: { email } });
            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            
            req.session.user = { id: user.id, username: user.username, email: user.email, contact: user.contact };
            const token = jwt.sign(req.session.user, config.APP.JWT_SECRET, { expiresIn: '1h' });
            req.session.token = token;

            res.status(200).json({ status: 'success', redirectUrl: '/dashboard', token });
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error logging in' });
        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy(function (err) {
                if (err) { 
                    throw new Error('Error logging out');
                }
    
                res.clearCookie(config.SESSION.SESSION_NAME ?? 'connect.sid'); 
                res.redirect('/login?auth=booted-out-required-to-login-once-again');
            });
        } catch (error) { 
            if (req.session) {
                req.flash('status', 'error');
                req.flash('message', 'Unexpected error occurred');
            }
            
            res.redirect('back');
        }
    }
}

module.exports = AuthController;
