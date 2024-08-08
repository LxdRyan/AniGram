import "./App.css";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import User from "./views/User";
import Details from "./views/Details";
import Search from "./views/Search";
import Add from "./views/Add";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <Login /> },
    { path: "/user/:id", element: <User /> },
    { path: "/post/:id", element: <Details /> },
    { path: "/search", element: <Search /> },
    { path: "/add/:id", element: <Add /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
