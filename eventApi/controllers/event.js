const eventLogic = require('../Logic/eventLogic');


const getAllEvent = async (req, res, next) => {
    try {
        const { date,searchkey , page = 1, limit = 6 } = req.query;
        const events = await eventLogic.getAllEventsLogic(date,searchkey,  parseInt(page), parseInt(limit));
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};

const getEventById = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const { page = 1, limit = 6 } = req.query;

      //  const events = await eventLogic.getEventByIdLogic(eventId);
      const events = await eventLogic.getEventWithCommentsLogic(eventId, parseInt(page), parseInt(limit));

        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};

const getJoinedEvent = async (req, res, next) => {
    try {
        const { userId } = req.user;

        const events = await eventLogic.joinedParticipantLogic(userId);

        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};

const getCreatedEvent = async (req, res, next) => {
    try {
        const { userId } = req.user;

        const events = await eventLogic.createdParticipantLogic(userId);

        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};


const createEvent = async (req, res, next) => {
    try {
        const { title, description, date, location, organizer } = req.body;
        const { userId, userName } = req.user;

        let photoBase64 = null;
        if (req.file) {
            photoBase64 = req.file.buffer.toString('base64');
        }

        const newEvent = await eventLogic.createEventLogic({
            title,
            description,
            date,
            location,
            organizer,
            userId,
            userName,
            photo: photoBase64,
        });

        res.status(201).json({ message: 'Event created successfully.', event: newEvent });
    } catch (error) {
        console.log("99 da error:",error);
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



const removeParticipant = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.user;

        const event = await eventLogic.removeParticipantLogic(eventId,  userId );
        res.status(200).json({ message: 'User successfully removed the event.', event });
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
    getEventById,
    removeParticipant,
    getJoinedEvent,
    getCreatedEvent,
};
