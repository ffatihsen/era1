const validationHandler = (schema) => {
    return async (req, res, next) => {
      try {

        await schema.validateAsync(req, { allowUnknown: true });
  
        next();
      } catch (error) {
        next(error);
      }
    };
  };
  
module.exports = validationHandler;
  