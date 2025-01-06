const Joi = require('joi');

// Kullanıcı oluşturma (POST) için validasyon
const createUser = Joi.object({
    body: Joi.object({
        username: Joi.string()
            .min(3)
            .max(100)
            .required()
            .label('Username'),
        email: Joi.string()
            .email()
            .required()
            .label('Email'),
        password: Joi.string()
            .min(8)
            .max(128)
            .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'))
            .message(
                'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character'
            )
            .required()
            .label('Password'),
    }).required(),
});

// Kullanıcı bilgilerini getirme (GET) için validasyon
const getUser = Joi.object({
    params: Joi.object({
        id: Joi.number().integer().positive().required().label('ID'),
    }).required(),
});

const getUserByUserName = Joi.object({
    body: Joi.object({
      userName: Joi.string()
        .min(3)
        .max(100)
        .required()
        .label('userName'),
    }).required()
  });

// Kullanıcı güncelleme (PUT) için validasyon
const updateUser = Joi.object({
    body: Joi.object({
        username: Joi.string()
            .min(3)
            .max(100)
            .optional()
            .label('Username'),
    }).required(),
});



// Kullanıcı giriş yapma (LOGIN) için validasyon
const loginUser = Joi.object({
    body: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .label('Email'),
        password: Joi.string()
            .min(8)
            .max(128)
            .required()
            .label('Password'),
    }).required(),
});

// Token doğrulama (VERIFY) için validasyon
const verifyToken = Joi.object({
    headers: Joi.object({
        authorization: Joi.string().required().label('Authorization Token'),
    }).unknown(true), // Diğer header'ları göz ardı et
});

module.exports = {
    createUser,
    getUser,
    updateUser,
    loginUser,
    verifyToken,
    getUserByUserName,
};
