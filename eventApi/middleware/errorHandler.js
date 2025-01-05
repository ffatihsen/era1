exports.errorHandler = (err, req, res, next) => {
    const isProduction = process.env.NODE_ENV === 'production';

    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });

    
    if (err.isJoi) {
        const errors = err.details.map(detail => ({
            field: detail.context.key,
            message: detail.message,
        }));

        return res.status(400).json({
            error: 'Validation Error',
            details: errors,
        });
    }

    
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.details).map(e => ({
            field: e.field,
            message: e.message,
        }));

        return res.status(400).json({
            error: 'Validation Error',
            details: errors,
        });
    }

    
    if (err.name === 'CastError') {
        return res.status(400).json({
            error: 'Invalid ID format',
            message: `The provided ID '${err.value}' is not valid.`,
        });
    }


    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];

        return res.status(409).json({
            error: 'Duplicate Entry',
            message: `The value '${value}' for field '${field}' must be unique.`,
        });
    }


    if (err.name === 'MongoServerError') {
        return res.status(500).json({
            error: 'Database Error',
            details: isProduction ? undefined : err.message,
        });
    }

  
    res.status(err.status || 500).json({
        error: isProduction ? 'An unexpected error occurred.' : err.message,
        stack: isProduction ? undefined : err.stack,
    });
};
