import eventModel from "../Model/event.js";

// Create a new event
export const createEvent = async (req, res) => {
    try {
        const event = new eventModel(req.body);
        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await eventModel.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
    try {
        const event = await eventModel.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await eventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event updated successfully", updatedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await eventModel.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
