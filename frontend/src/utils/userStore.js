import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import the user slice reducer


// Configure the Redux store
const userStore = configureStore({
  reducer: {
    // Combine the reducers into a single root reducer
    user: userReducer, // Add the user slice to handle user-related state
  },
});

export default userStore; // Export the store for use throughout the application