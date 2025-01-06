const Joi = require('joi');
const mongoose = require('mongoose');

const objectIdValidator = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid', { value });
    }
    return value;
};

const createEvent = Joi.object({
    title: Joi.string().min(3).max(100).required().label('Title'),
    description: Joi.string().min(10).max(500).required().label('Description'),
    date: Joi.date().iso().required().label('Date'),
    location: Joi.string().min(3).max(100).required().label('Location'),
    organizer: Joi.string().optional().label('Organizer'),
    // Photo validation for file upload
    photo: Joi.alternatives().try(
        Joi.string().base64().max(2 * 1024 * 1024).optional(), // If photo is base64 encoded string
        Joi.object().keys({
            size: Joi.number().max(2 * 1024 * 1024).optional(),  // Ensure file size is under 2MB
            mimetype: Joi.string().valid('image/jpeg', 'image/png').optional() // Only accept image/jpeg or image/png
        }).optional()
    ).optional()
});

const updateEvent = Joi.object({
    params: Joi.object({
        id: Joi.string().custom(objectIdValidator).required().label('Event ID'),
    }).required(),
    body: Joi.object({
        title: Joi.string().min(3).max(100).optional().label('Title'),
        description: Joi.string().min(10).max(500).optional().label('Description'),
        date: Joi.date().iso().optional().label('Date'),
        location: Joi.string().min(3).max(100).optional().label('Location'),
        organizer: Joi.string().optional().label('Organizer'),
    }).required(),
});

const addParticipant = Joi.object({
    params: Joi.object({
        eventId: Joi.string().custom(objectIdValidator).required().label('Event ID'),
    }).required(),
});

const addComment = Joi.object({
    params: Joi.object({
        eventId: Joi.string().custom(objectIdValidator).required().label('Event ID'),
    }).required(),
    body: Joi.object({
        comment: Joi.string().min(1).max(500).required().label('Comment'),
    }).required(),
});

module.exports = {
    createEvent,
    updateEvent,
    addParticipant,
    addComment,
};
