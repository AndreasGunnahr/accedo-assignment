import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
} from "../components";
import {
  cn,
  buildVideoLinks,
  setPlaylistToStorage,
  getPlaylistFromStorage,
} from "../utils";
import { videos } from "../data";

export const Watch = () => {
  const { title } = useParams<{ title: string }>();
  const [playlist, setPlaylist] = useState(() => {
    return getPlaylistFromStorage() || videos.slice(0, 3);
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const {
    jumpBackTenSeconds,
    jumpForwardTenSeconds,
    changeProgressBarStatus,
    onLoadedMetadata,
    togglePlaying,
    isPlaying,
    currentTime,
    duration,
  } = useVideoPlayer(videoRef, progressBarRef);

  const titleVideo = title ? title.replace(/-/g, " ") : undefined;
  const activeVideo = videos.find((video) => video.title === titleVideo);

  const calculateTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formatedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formatedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formatedMinutes}:${formatedSeconds}`;
  };

  const goToPreviousVideo = () => {
    const index = playlist.findIndex(
      (video) => video.title === activeVideo?.title,
    );
    const previousVideo = playlist[index - 1];
    const link = previousVideo
      ? buildVideoLinks(previousVideo.title)
      : buildVideoLinks(playlist[playlist.length - 1].title);

    window.location.href = link;
  };

  const goToNextVideo = () => {
    const index = playlist.findIndex(
      (video) => video.title === activeVideo?.title,
    );
    const nextVideo = playlist[index + 1];
    const link = nextVideo
      ? buildVideoLinks(nextVideo.title)
      : buildVideoLinks(playlist[0].title);

    window.location.href = link;
  };

  const handleRemoveTrack = (title: string) => {
    setPlaylist((playlist) => {
      const newPlaylist = playlist.filter((video) => video.title !== title);
      setPlaylistToStorage(newPlaylist);
      return newPlaylist;
    });
  };

  return (
    <main className="flex h-screen flex-col">
      {!activeVideo ? (
        <NoVideoFound />
      ) : (
        <>
          <div className="flex h-20 shrink-0 items-center bg-black px-4">
            <Link to="/">
              <Icons.LeftArrow className="h-8 w-8 text-white" />
            </Link>
          </div>
          <div className="relative flex-1">
            <video
              ref={videoRef}
              preload="metadata"
              onLoadedMetadata={onLoadedMetadata}
              className="h-[calc(100vh-11rem)] w-full object-cover"
            >
              <source src={activeVideo?.sources[0]} type="video/mp4"></source>
            </video>
          </div>
          <div className="relative flex h-24 shrink-0 flex-col justify-center space-y-2 bg-black px-4">
            <div className="flex w-full items-center space-x-2">
              <input
                ref={progressBarRef}
                type="range"
                min="0"
                max="100"
                defaultValue="0"
                className="w-full cursor-pointer"
                onChange={changeProgressBarStatus}
              />
              <span className="shrink-0 text-white">
                {calculateTime(currentTime) + " / " + calculateTime(duration)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPreviousVideo}
                  disabled={playlist.length === 1}
                  className="text-white disabled:text-gray-800"
                >
                  <Icons.Previous className="h-10 w-10 fill-current " />
                </button>
                <button onClick={jumpBackTenSeconds}>
                  <Icons.Backward className="h-10 w-10 fill-white" />
                </button>
                {isPlaying ? (
                  <button onClick={togglePlaying}>
                    <Icons.Pause className="h-10 w-10 fill-white" />
                  </button>
                ) : (
                  <button onClick={togglePlaying}>
                    <Icons.Play className="h-10 w-10 fill-white" />
                  </button>
                )}
                <button onClick={jumpForwardTenSeconds}>
                  <Icons.Forward className="h-10 w-10 fill-white" />
                </button>
                <button
                  onClick={goToNextVideo}
                  disabled={playlist.length === 1}
                  className="text-white disabled:text-gray-800"
                >
                  <Icons.Next className="h-10 w-10 fill-current" />
                </button>
              </div>
              <h2 className="text-lg font-medium tracking-wide text-white">
                {activeVideo?.title}
              </h2>
              <div>
                <PlaylistDropdown
                  playlist={playlist}
                  onRemoveTrack={handleRemoveTrack}
                  activeVideo={activeVideo}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

const NoVideoFound = () => (
  <div className="flex h-screen flex-col items-center justify-center space-y-4">
    <h1 className="text-lg">
      Oops! You seems like you tried to access a non existing video.
    </h1>

    <Link to="/" className="rounded-xl bg-black px-4 py-2 text-white">
      Go back to home
    </Link>
  </div>
);

const PlaylistDropdown = ({
  playlist,
  activeVideo,
  onRemoveTrack,
}: {
  playlist: typeof videos;
  activeVideo: (typeof videos)[number];
  onRemoveTrack: (title: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-1 rounded bg-gray-50 px-2 py-1.5 font-medium">
        <Icons.SquareStack className="h-6 w-6 fill-white" />
        <span>Open playlist</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 min-w-[600px] bg-gray-50">
        <DropdownMenuLabel className="text-2xl font-bold">
          Playlist
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {playlist.map((video, index) => {
          const active = activeVideo?.title === video.title;
          return (
            <DropdownMenuItem
              key={index}
              className="flex w-full items-center justify-between rounded border-b border-gray-100 p-2 last:border-none"
            >
              <a
                href={buildVideoLinks(video.title)}
                className={cn("flex w-full items-center space-x-2", {
                  "pointer-events-none": active,
                })}
              >
                <span
                  className={cn("text-lg text-gray-400", {
                    "font-semibold text-black": active,
                  })}
                >
                  {index + 1}. {video.title}
                </span>
              </a>
              <button
                onClick={() => onRemoveTrack(video.title)}
                disabled={active}
                className="flex items-center space-x-1 rounded bg-black p-2 text-sm font-medium text-white disabled:bg-gray-300"
              >
                <Icons.Trash className="h-4 w-4" />
                <span>Remove</span>
              </button>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
