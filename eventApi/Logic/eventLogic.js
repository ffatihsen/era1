const { default: mongoose } = require('mongoose');
const Event = require('../models/event');

const getAllEventsLogic = async (date, searchkey) => {
    let query = {};
  
    if (date && date !== "false" && date != null) {
      query.date = new Date(date);
    }
  
    if (searchkey && searchkey !== "false" && searchkey !== undefined && searchkey != "null") {
      query.title = { $regex: searchkey, $options: 'i' };
    }
  
    const events = await Event.find(query).select('_id title date organizer');
  
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

    const event = await Event.findById(eventId)
        .select('_id title description date location organizer')
        .lean();

    if (!event) {
        throw new Error('Event not found.');
    }

    const comments = await Event.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(eventId) } },
        { $unwind: '$comments' },
        { $sort: { 'comments.date': -1 } },
        { $skip: skip },
        { $limit: limit },
        { $group: { _id: '$_id', comments: { $push: '$comments' } } },
    ]);


    const attendeeCount = await Event.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(eventId) } },
        { $project: { participantCount: { $size: "$participants" } } }
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


const removeParticipantLogic = async (eventId, userId) => {
    const event = await Event.findById(eventId);

    if (!event) {
        throw new Error('No events found.');
    }

    const participantIndex = event.participants.findIndex(participant => participant.userId === userId);
    if (participantIndex === -1) {
        throw new Error('User is not a participant of the event.');
    }

    event.participants.splice(participantIndex, 1);

    await event.save();

    return event;
};


const joinedParticipantLogic = async ( userId) => {

    const joinedEvents = await Event.find({
        'participants.userId': userId,
    });

    if (!joinedEvents.length) {
        throw new Error('No events were found that the user attended.');
    }
    return joinedEvents;
};


const createdParticipantLogic = async ( userId) => {
   
    const createdEvents = await Event.find({ userId: userId });

    if (!createdEvents.length) {
        throw new Error('No user created events found.');
    }
    return createdEvents

};



module.exports = {
    getAllEventsLogic,
    createEventLogic,
    addParticipantLogic,
    addCommentLogic,
    updateEventLogic,
    deleteEventLogic,
    getEventByIdLogic,
    getEventWithCommentsLogic,
    removeParticipantLogic,
    joinedParticipantLogic,
    createdParticipantLogic,
};
