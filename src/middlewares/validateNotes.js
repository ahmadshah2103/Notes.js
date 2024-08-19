const Joi = require('joi');

const validateCreateNotes = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string()
    });

    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    next();
}

const validateUpdateNotes = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string(),
        content: Joi.string()
    });

    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    next();
}

module.exports = {validateCreateNotes, validateUpdateNotes};