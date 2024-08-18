const { GaxiosError } = require('gaxios');

const handleErrors = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).json({ message: 'Resource not found' });
    }

    if (err instanceof GaxiosError) {
        return res.status(401).json({ message: 'Invalid access token. The provided token is invalid or expired.' });
    }

    // Handle other specific errors here

    // Generic error handler
    return res.status(500).json({ message: 'Internal server error' });
};

module.exports = handleErrors;