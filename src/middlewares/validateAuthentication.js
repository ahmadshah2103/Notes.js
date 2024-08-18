const Joi = require('joi');

const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    dob: Joi.date().iso().required(),
    gender: Joi.string().allow('male', 'female', 'not_specified').required()
})

const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const authenticateWithGoogleSchema = Joi.object({
    accessToken: Joi.string().required()
})

const validateSignup = (req, res, next) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

const validateSignin = (req, res, next) => {
    const { error } = signinSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

const validateAuthenticateWithGoogle = (req, res, next) => {
    const { error } = authenticateWithGoogleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}


module.exports = {validateSignup, validateSignin, validateAuthenticateWithGoogle};