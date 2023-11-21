import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { videos } from "./data";
import { getPlaylistFromStorage, setPlaylistToStorage } from "./utils";
import { Home, Watch } from "./pages";

import "./global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/watch/:title",
    element: <Watch />,
  },
]);

export default function App() {
  /* 
    Added for demo purposes to keep the playlist consistent between pages. 
    In a real scenario the playlist would either be fetched from a backend API or kept in a store (state management library)
  */
  useEffect(() => {
    if (!getPlaylistFromStorage()) {
      setPlaylistToStorage(videos.slice(0, 3));
    }
  }, []);

  return <RouterProvider router={router} />;
}
