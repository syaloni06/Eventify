import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import NotFound from "./components/NotFound.jsx";
import { lazy } from 'react';
import { Suspense } from 'react';
import CreateEvent from './Components/CreateEvent.jsx';
import SignIn from './Components/SignIn.jsx';
import SignUp from './Components/SignUp.jsx';

const EventList = lazy(() => import("./Components/EventList.jsx"));
const EventDetails = lazy(() => import("./Components/EventDetails.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main application component
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EventList /> {/* Lazy load VideoList component */}
          </Suspense>
        ),
      },
      {
        path: "/eventdetails",
        element: (
          <Suspense fallback={<div>Loading Counter...</div>}>
            <EventDetails />
          </Suspense>
        ),
      },
      {
        path: "/createevent",
        element: <CreateEvent />,
      },
      {
        path: "/signin",
        element: <SignIn />, // Route for Signin page
      },
      {
        path: "signup",
        element: <SignUp /> // Route for Signup page
      },
    ],
    errorElement: <NotFound />, // Handle 404 errors
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
