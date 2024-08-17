const {User} = require('../models');
const {ValidationError, UniqueConstraintError} = require('sequelize');
const generateUsername = require('../utils/generateUsername');
const {generateToken} = require("../utils/jwt");


const signup = async (req, res) => {
    try {
        const existingUser = await User.findOne({where: {email: req.body.email}});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists with this email, try signing in instead!'});
        }

        req.body.username = generateUsername(req.body.email);

        const newUser = await User.create(req.body);

        return res.status(201).json({
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                dob: newUser.dob,
                gender: newUser.gender,
                avatarUrl: newUser.avatarUrl,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            },
            token: generateToken(newUser)
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

module.exports = {signup};