const {User} = require('../models');
const generateUsername = require('../utils/generateUsername');
const {generateToken} = require("../utils/jwt");
const { google } = require('googleapis');
const {verifyPassword} = require("../utils/passwordHashing");
const createOrUpdateUser = require('../utils/createOrUpdateUser');

const signup = async (req, res, next) => {
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
        next(error);
    }
};

const signin = async (req, res, next) => {
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
        next(error);
    }
}

const authenticateWithGoogle = async (req, res, next) => {
    const {accessToken} = req.body;

    try {
        const oauth2Client = new google.auth.OAuth2();

        oauth2Client.setCredentials({ access_token: accessToken });

        const service = google.people({
            version: 'v1',
            auth: oauth2Client
        });
        const profile = await service.people.get({
            resourceName: 'people/me',
            personFields: 'photos,names,emailAddresses,birthdays,genders'
        });

        // return res.status(200).json(profile.data);

        const googleSub = profile.data.resourceName.slice(7);
        const photos = profile.data.photos || [];
        const names = profile.data.names || [];
        const emails = profile.data.emailAddresses || [];
        const birthdays = profile.data.birthdays || [];
        const genders = profile.data.genders || [];

        if (!photos.length || !names.length || !emails.length || !birthdays.length || !genders.length || !googleSub) {
            return res.status(400).json({ message: 'Missing required fields!' });
        }

        const avatarUrl = photos[0].url;
        const name = names[0].displayName;
        const email = emails[0].value;
        const birthday = birthdays[0].date;
        const gender = genders[0].value;

        const dob = `${birthday.year}-${String(birthday.month).padStart(2, '0')}-${String(birthday.day).padStart(2, '0')}`;
        const username = generateUsername(email);

        const userData = {
            name,
            email,
            password: null,
            googleSub,
            avatarUrl,
            dob,
            gender,
            username,
        };

        const [ user, created ] = await createOrUpdateUser(userData);

        return res.status(created ? 201 : 200).json({
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
        next(error);
    }
};

module.exports = {signup, signin, authenticateWithGoogle};