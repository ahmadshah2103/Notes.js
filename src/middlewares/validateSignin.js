const Joi = require('joi');

const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const validateSignin = (req, res, next) => {
    const { error } = signinSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

module.exports = validateSignin;