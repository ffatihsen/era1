const validationHandler = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req, { allowUnknown: true, abortEarly: false });
            next();
        } catch (error) {
            const details = error.details.map((detail) => ({
                field: detail.path.join('.'),
                message: detail.message,
            }));
            next({ name: 'ValidationError', details });
        }
    };
};

module.exports = validationHandler;
