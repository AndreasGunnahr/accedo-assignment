import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Icons, MediaCard } from "../components";
import {
  buildVideoLinks,
  getPlaylistFromStorage,
  setPlaylistToStorage,
} from "../utils";
import { videos } from "../data";

export const Home = () => {
  const [playlist, setPlaylist] = useState(() => {
    return getPlaylistFromStorage() || videos.slice(0, 3);
  });
  const [activeVideo, setActiveVideo] = useState(playlist[0]);

  const handleAddVideo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = e.currentTarget.playlist.value;
    const video = videos.find((video) => video.sources[0] === url);
    const alreadyExists = playlist.find((video) => video.sources[0] === url);

    if (!video) {
      return alert("No movie found with that url. Please try again!");
    }
    if (alreadyExists) {
      return alert(
        "Movie already added to your list. Please choose another one!",
      );
    }

    setPlaylist((playlist) => {
      const newPlaylist = [...playlist, video];
      setPlaylistToStorage(newPlaylist);
      return newPlaylist;
    });
    e.currentTarget.reset();
  };

  const handleRemoveVideo = (title: string) => {
    setPlaylist((playlist) => {
      const newPlaylist = playlist.filter((video) => video.title !== title);

      if (activeVideo.title === title) setActiveVideo(newPlaylist[0]);

      setPlaylistToStorage(newPlaylist);
      return newPlaylist;
    });
  };

  return (
    <main className="mx-auto grid min-h-screen max-w-screen-xl grid-cols-1 gap-6 py-16 md:grid-cols-10">
      <section className="p-4 md:col-span-3">
        <div className="relative h-64 rounded-xl bg-black">
          <img
            className="h-full w-full rounded-xl object-cover"
            alt="Big Buck Bunny"
            src={activeVideo.thumb}
          />

          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black bg-opacity-40 ">
            <Link
              to={buildVideoLinks(activeVideo.title)}
              className="text-white"
            >
              <Icons.Play className="h-20 w-20 fill-white" />
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold">{activeVideo.title}</h1>
          <h2 className="text-sm font-medium text-gray-400">
            {activeVideo.subtitle}
          </h2>
          <p className="mt-4 tracking-wide text-gray-400">
            {activeVideo.description}
          </p>
        </div>
      </section>
      <section className="p-4 md:col-span-7">
        <form
          className="border-b border-gray-200 pb-4"
          onSubmit={handleAddVideo}
        >
          <label className="text-lg font-bold text-gray-700" htmlFor="playlist">
            Add new movie
          </label>
          <div className="mt-2 flex items-center justify-center space-x-2">
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="playlist"
              type="text"
              placeholder="Enter a new video url.."
            />
            <button
              className="flex shrink-0 items-center space-x-1 rounded bg-black px-4 py-2 text-sm font-medium tracking-wider text-white shadow"
              type="submit"
            >
              <Icons.Plus className="h-4 w-4" />
              <span>Add to playlist</span>
            </button>
          </div>
        </form>

        <div className="mt-2 space-y-4">
          {playlist.map((video) => (
            <MediaCard
              key={video.title}
              active={video.title === activeVideo.title}
              onRemove={handleRemoveVideo}
              onClick={() => setActiveVideo(video)}
              showRemoveButton={playlist.length > 1}
              {...video}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
