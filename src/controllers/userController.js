const {User} = require('../models');
const {ValidationError, UniqueConstraintError} = require('sequelize');
const generateUsername = require('../utils/generateUsername');
const {generateToken} = require("../utils/jwt");
const {verifyPassword} = require("../utils/passwordHashing");


const signup = async (req, res) => {
    try {
        const existingUser = await User.findOne({where: {email: req.body.email}});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists with this email, try signing in instead!'});
        }

        req.body.username = generateUsername(req.body.email);

        const user = await User.create(req.body);

        return res.status(201).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
                dob: user.dob,
                gender: user.gender,
                avatarUrl: user.avatarUrl,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            token: generateToken(user)
        });

    } catch (error) {
        if (error instanceof ValidationError) {
            const formattedErrors = {};
            error.errors.forEach(err => {
                formattedErrors[err.path] = err.message;
            });
            return res.status(400).json({message: formattedErrors});
        } else if (error instanceof UniqueConstraintError) {
            return res.status(400).json({message: error.message});
        } else {
            return res.status(500).json({message: `An unknown error occurred: ${error.message}`});
        }
    }
};

const signin = async (req, res) => {
    try {
        const user = await User.findOne({where: {email: req.body.email}});
        if (!user) {
            return res.status(400).json({message: 'User not found, please sign up!'});
        }

        const isPasswordValid = await verifyPassword(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: 'Invalid credentials!'});
        }

        return res.status(201).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
                dob: user.dob,
                gender: user.gender,
                avatarUrl: user.avatarUrl,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            token: generateToken(user)
        });
    } catch(error) {
        return res.status(500).json({message: `An unknown error occurred: ${error}`});
    }
}



module.exports = {signup, signin};