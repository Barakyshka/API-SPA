import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Albums, { loader as albumsLoader } from "./routes/Albums";
import Album, { loader as albumLoader } from "./routes/Album";
import Users, { loader as usersLoader } from "./routes/Users";
import User, { loader as userLoader } from "./routes/User";
import Layout from "./routes/Layout";
import ErrorPage from "./routes/ErrorPage";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/albums",
        loader: albumsLoader,
        element: <Albums />
      },
      {
        path: "/albums/:id",
        loader: albumLoader,
        element: <Album />
      },
      {
        path: "/",
        loader: usersLoader,
        element: <Users />
      },
      {
        path: "/users/:id",
        loader: userLoader,
        element: <User />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
