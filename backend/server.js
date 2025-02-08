import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import { userRoutes } from "./Routes/userRoutes.js";
import { eventRoutes } from "./Routes/eventRoutes.js";
import dotenv from "dotenv";

const app = new express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`Method:${req.method} Url:${req.url} Status:${res.statusCode}`);
  });
  next();
});


app.listen(5100, () => {
  console.log("Server is running on port 5100");
});

userRoutes(app);
eventRoutes(app);


dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("open", () => {
  console.log("Database connection successful");
});


db.on("error", () => {
  console.log("Database connection not successful");
});