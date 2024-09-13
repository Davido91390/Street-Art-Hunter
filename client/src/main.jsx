import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { getMap, getUserbyId, getCamera, getGallery } from "./services/request";

import App from "./App";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Gallery from "./pages/Gallery";
import GalleryDetails from "./pages/GalleryDetails";
import Camera from "./pages/Camera";
import Profile from "./pages/Profile";
import Connection from "./pages/Connection";
import Register from "./pages/Register";
// import Ranking from "./pages/Ranking";

import "./styles/app.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/connection",
        element: <Connection />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <Home />,
        loader: getMap,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
        loader: async () => ({
          artworkList: await getMap(),
          styleArtwork: await getCamera(),
        }),
      },
      {
        path: "/gallery/:id",
        element: <GalleryDetails />,
        loader: ({ params }) => getGallery(params.id),
      },
      {
        path: "/camera",
        element: <Camera />,
        loader: getCamera,
      },

      {
        path: "/profile/:id",
        element: <Profile />,
        loader: ({ params }) => getUserbyId(params.id),
      },
      /*
            {
        path: "/profile/ranking",
        element: <Ranking />,
      },
      */
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
