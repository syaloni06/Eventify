import mongoose from "mongoose";
const attendeesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
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

const creatorSchema = new mongoose.Schema({
  creatorId: {
      type: String,
      required: true
  },
  creatorName: {
      type: String,
      reqired: true 
  },
  creatorEmail: {
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
  eventDate: {
    type: Date,
    required: true
  },
  eventLocation: {
    type: String,
    required: true 
  },
  eventDescription: {
    type: String,
    required: true
  },
  createdBy: creatorSchema,
  attendees: [attendeesSchema]
});

// Create a Mongoose model for the channel schema
const eventModel = mongoose.model('event', eventSchema);

// Export the channel model to use in other parts of the application
export default eventModel;