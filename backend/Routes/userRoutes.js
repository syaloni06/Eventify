import { registerUser, loginUser } from "../Controller/userController.js";

// Function to define authentication-related routes
export const userRoutes = (app) => {
  // Route to handle user registration
  app.post('/register', registerUser);

  // Route to handle user login
  app.post('/login', loginUser);
};