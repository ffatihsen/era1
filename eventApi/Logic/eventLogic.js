const { default: mongoose } = require('mongoose');
const Event = require('../models/event');

const getAllEventsLogic = async () => {
    const events = await Event.find().select('_id title date organizer');
    if (!events || events.length === 0) {
        throw new Error('No events found.');
    }
    return events;
};

const getEventByIdLogic = async (eventId) => {

    const event = await Event.findById(eventId);
    if (!event || event.length === 0) {
        throw new Error('No events found.');
    }

    const attendeeCount = event.participants.length;


    return {
        ...event.toObject(),
        attendeeCount,
      };
};

const getEventWithCommentsLogic = async (eventId, page = 1, limit = 6) => {
    const skip = (page - 1) * limit;

    // Etkinlik bilgilerini getir
    const event = await Event.findById(eventId)
        .select('_id title description date location organizer')
        .lean();

    if (!event) {
        throw new Error('Event not found.');
    }

    // Yorumları getir ve paginasyon uygula
    const comments = await Event.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(eventId) } }, // ObjectId yapıcısı new ile çağrılmalı
        { $unwind: '$comments' },
        { $sort: { 'comments.date': -1 } },
        { $skip: skip }, // Paginasyon için atlama
        { $limit: limit }, // Belirtilen sayıda yorum getir
        { $group: { _id: '$_id', comments: { $push: '$comments' } } },
    ]);


    const attendeeCount = await Event.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(eventId) } },
        { $project: { participantCount: { $size: "$participants" } } }  // Katılımcı sayısını almak
    ]);

    const count = attendeeCount.length > 0 ? attendeeCount[0].participantCount : 0

    return {
        ...event,
        attendeeCount:count,
        comments: comments.length > 0 ? comments[0].comments : [],
    };
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
    getEventByIdLogic,
    getEventWithCommentsLogic
};
