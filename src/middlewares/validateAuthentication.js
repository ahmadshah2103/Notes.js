const Joi = require('joi');

const validateSignup = (req, res, next) => {
    const signupSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        dob: Joi.date().iso().required(),
        gender: Joi.string().allow('male', 'female', 'not_specified').required()
    })

    const { error } = signupSchema.validate(req.body);
    if (error) {
        next(error)
    }
    next();
}

const validateSignin = (req, res, next) => {
    const signinSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const { error } = signinSchema.validate(req.body);
    if (error) {
        next(error)
    }
    next();
}

const validateAuthenticateWithGoogle = (req, res, next) => {
    const authenticateWithGoogleSchema = Joi.object({
        accessToken: Joi.string().required()
    })

    const { error } = authenticateWithGoogleSchema.validate(req.body);
    if (error) {
        next(error)
    }
    next();
}


module.exports = {validateSignup, validateSignin, validateAuthenticateWithGoogle};