import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Handle User Register
export const Register = async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            console.log("Data tidak lengkap:", req.body); 
            return res.status(400).json({ 
                success: false, 
                message: "Silahkan isi semua kolom (Name, Email, Password)!" 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: `User ${email} already exists` });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save User
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000 
        });

        return res.status(201).json({ success: true, user: { name: newUser.name, email: newUser.email } });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Handle User Login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid Email or Password!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Email or Password!" });
        }

        // Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000 
        });

        return res.json({ 
            success: true, 
            user: { name: user.name, email: user.email } 
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Handle Authentication (Check Session)
export const isAuth = async (req, res) => {
    try {
        const userId = req.userId; 

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized Access. Login Again" });
        }

        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            userData: {
                id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified 
            }
        });
    } catch (error) {
        console.error("Error in isAuth controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Handle Logout
export const Logout = async(req,res)=>{
    res.clearCookie('token', { 
        httpOnly: true, secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict'
    });
    return res.json({success: true, message: "User logged out successfully"})
}