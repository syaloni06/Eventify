import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { userRoutes } from "./Routes/userRoutes.js";
import { eventRoutes } from "./Routes/eventRoutes.js";

dotenv.config();

const app = express();
const server = app.listen(5100, () => {
  console.log("Server is running on port 5100");
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("open", () => console.log("Database connection successful"));
db.on("error", () => console.log("Database connection not successful"));

// WebSocket Server
const wss = new WebSocketServer({ server });
let clients = new Set();

wss.on("connection", (ws) => {
  console.log("New client connected!");
  clients.add(ws);

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });
});

// Function to send notifications
export const sendNotification = (notification) => {
  clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(notification));
    }
  });
};

// Routes
userRoutes(app);
eventRoutes(app);
