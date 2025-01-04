const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  userName: { type: String, required: true }, 
  userId: { type: Number, required: true }, 
  comment: { type: String, required: true }, 
  date: { type: Date, default: Date.now } 
});


const participantSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  userName: { type: String, required: true }
});



const eventSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  description: { type: String, required: true }, 
  date: { type: Date, required: true }, 
  location: { type: String, required: true }, 
  organizer: { type: String, required: false },
  userId:{ type: Number, required: true }, 
  userName:{ type: String, required: true },
  participants: [participantSchema],
  comments: [commentSchema] 
}, { timestamps: true });


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
