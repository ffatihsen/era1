const Event = require('../models/event');

const getAllEventsLogic = async () => {
    const events = await Event.find();
    if (!events || events.length === 0) {
        throw new Error('No events found.');
    }
    return events;
};

const createEventLogic = async (eventData) => {
    const newEvent = new Event(eventData);
    await newEvent.save();
    return newEvent;
};

const addParticipantLogic = async (eventId, user) => {
    const event = await Event.findById(eventId);

    if (!event) {
        throw new Error('No events found.');
    }

    if (event.participants.some(participant => participant?.userId === user.userId)) {
        throw new Error('User has already joined the event.');
    }

    event.participants.push(user);
    await event.save();

    return event;
};

const addCommentLogic = async (eventId, commentData) => {
    const event = await Event.findById(eventId);

    if (!event) {
        throw new Error('No events found.');
    }

    event.comments.push(commentData);
    await event.save();

    return event;
};




const updateEventLogic = async (id, updateData, userId) => {
    const event = await Event.findById(id);

    if (!event) {
        throw new Error('No events found.');
    }

    if (event.userId !== userId) {
        throw new Error('You do not have permission to update this event..');
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });
    return updatedEvent;
};

const deleteEventLogic = async (id, userId) => {
    const event = await Event.findById(id);

    if (!event) {
        throw new Error('No events found.');
    }

    if (event.userId !== userId) {
        throw new Error('You do not have permission to delete this event.');
    }

    await Event.deleteOne({ _id: id });
    return 'Event deleted successfully.';
};

module.exports = {
    getAllEventsLogic,
    createEventLogic,
    addParticipantLogic,
    addCommentLogic,
    updateEventLogic,
    deleteEventLogic,
};
