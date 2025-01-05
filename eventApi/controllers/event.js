const eventLogic = require('../Logic/eventLogic');


const getAllEvent = async (req, res, next) => {
    try {
        const events = await eventLogic.getAllEventsLogic();
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};


const createEvent = async (req, res, next) => {
    try {
        const { title, description, date, location, organizer } = req.body;
        const { userId, userName } = req.user;

        const newEvent = await eventLogic.createEventLogic({
            title,
            description,
            date,
            location,
            organizer,
            userId,
            userName,
        });

        res.status(201).json({ message: 'Event created successfully.', event: newEvent });
    } catch (error) {
        next(error);
    }
};


const addParticipant = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const { userId, userName } = req.user;

        const event = await eventLogic.addParticipantLogic(eventId, { userId, userName });
        res.status(200).json({ message: 'User successfully joined the event.', event });
    } catch (error) {
        next(error);
    }
};




const addComment = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const { comment } = req.body;
        const { userId, userName } = req.user;

        const event = await eventLogic.addCommentLogic(eventId, {
            userId,
            userName,
            comment,
            date: new Date(),
        });

        res.status(200).json({ message: 'Comment added successfully.', event });
    } catch (error) {
        next(error);
    }
};


const updateEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;

        const updatedEvent = await eventLogic.updateEventLogic(id, req.body, userId);
        res.status(200).json({ message: 'The event was updated successfully..', event: updatedEvent });
    } catch (error) {
        next(error);
    }
};


const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;

        const message = await eventLogic.deleteEventLogic(id, userId);
        res.status(200).json({ message });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    addParticipant,
    addComment,
};
