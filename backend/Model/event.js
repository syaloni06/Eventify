import mongoose from "mongoose";
const attendeesSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    userName: {
        type: String,
        reqired: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    }
});
const eventSchema = new mongoose.Schema({

  eventName: {
    type: String,
    required: true, 
    unique: true 
  },

  eventLocation: {
    type: String,
    required: true 
  },

  eventDescription: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  attendees: [attendeesSchema]
});

// Create a Mongoose model for the channel schema
const eventModel = mongoose.model('event', eventSchema);

// Export the channel model to use in other parts of the application
export default eventModel;