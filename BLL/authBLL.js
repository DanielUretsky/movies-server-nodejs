require('dotenv').config();
const UserModel = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registration = async (userData) => {
    try {
        //await UserModel.validate(userData);
        const potentialUser = await UserModel.findOne({
            $or: [{ email: userData.email }, { username: userData.username }],
        });

        if (potentialUser) return {
            status: 409,
            message: `User with ${potentialUser.email === userData.email ? `email ${userData.email}` : `username ${userData.username}`} is already exist.`
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = new UserModel({ ...userData, password: hashedPassword });
        if (!newUser) return { status: 500, message: 'Unknown server error' };

        await newUser.save();
        return { status: 201, message: "Registration completed succesfully!" };
    } catch (err) {
        if (err.name == 'ValidationError') return { status: 400, message: err.message };
        return { status: 500, message: 'Unknown server error' };
    }
}

const login = async (email, password) => {
    try {
        if ((!email || !password) || (email == "" || password == "")) return { status: 400, message: 'Email or password cannot be empty' };
      
        const user = await UserModel.findOne({ email });
        if (!user) return { status: 404, message: 'Unknown email or password' };
       
        const decodedPassword = await bcrypt.compare(password, user.password);
        if (!decodedPassword) return { status: 404, message: 'Unknown email or password' };

        const token = jwt.sign({ _id: user._id, email: user.email, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        if (!token) return { status: 500, message: 'Unknown server error' };
        
        return {
            status: 200,
            message: {
                token,
                userInfo: {
                    _id: user._id,
                    email: user.email
                }
            }
        };
    } catch (err) {
        console.log(err.message);
        return { status: 500, message: 'Unknown server error' }
    }
}

module.exports = {
    registration,
    login
}