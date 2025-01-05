const dotenv = require("dotenv");
dotenv.config();

exports.errorHandler = (err, req, res, next) => {

    const isProduction = process.env.NODE_ENV === 'production';

    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });


    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: err.message,
            details: err.details || [],
        });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        const fields = Object.keys(err.fields);
        return res.status(409).json({
            error: 'Duplicate entry',
            message: `The following field(s) must be unique: ${fields.join(', ')}`,
            details: isProduction ? undefined : err.errors,
        });
    }
    

    if (err.name === 'DatabaseError') {
        return res.status(500).json({
            error: 'A database error occurred.',
            details: isProduction ? undefined : err.message,
        });
    }


    res.status(err.status || 500).json({
        error: isProduction
            ? 'An unexpected error occurred.'
            : err.message,
        stack: isProduction ? undefined : err.stack,
    });
};
