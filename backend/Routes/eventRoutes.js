import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from "../Controller/eventController.js";
import { auth } from "../Middleware/auth.js";
export const eventRoutes = (app) => {
    app.post("/events", auth, createEvent);
    app.get("/events", auth, getAllEvents);
    app.get("/events/:id", auth, getEventById);
    app.put("/events/:id", auth, updateEvent);
    app.delete("/events/:id", auth, deleteEvent);
};

