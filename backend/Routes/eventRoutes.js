import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from "../controllers/eventController.js";

export const eventRoutes = (app) => {
    app.post("/events", createEvent);
    app.get("/events", getAllEvents);
    app.get("/events/:id", getEventById);
    app.put("/events/:id", updateEvent);
    appp.delete("/events/:id", deleteEvent);
};

