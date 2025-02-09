import eventModel from "../Model/event.js";
import { sendNotification } from "../server.js";

// Create a new event
export const createEvent = async (req, res) => {
    try {
        const event = new eventModel(req.body);
        await event.save();

        sendNotification({
            type: "event-created",
            message: `🎉 New Event Created: ${event.eventName} on ${event.eventDate}`,
        });

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

        sendNotification({
            type: "event-updated",
            message: `🛠️ Event Updated: ${updatedEvent.eventName} - Check details!`,
        });

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

export const notifyUpcomingEvents = async () => {
    try {
        const now = new Date();
        const upcomingEvents = await eventModel.find({ eventDate: { $gte: now, $lte: new Date(now.getTime() + 24 * 60 * 60 * 1000) } });

        upcomingEvents.forEach((event) => {
            sendNotification({
                type: "event-upcoming",
                message: `⏳ Upcoming Event: ${event.eventName} is happening soon!`,
            });
        });
    } catch (error) {
        console.error("Error sending upcoming event notifications:", error);
    }
};

setInterval(notifyUpcomingEvents, 60 * 60 * 1000);
