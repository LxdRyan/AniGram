import "./App.css";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import Login from "./views/Login";
import Details from "./views/Details";
import Search from "./views/Search";
import Add from "./views/Add";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <Login /> },
    { path: "/post/:id", element: <Details /> },
    { path: "/search", element: <Search /> },
    { path: "/add/:id", element: <Add /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
