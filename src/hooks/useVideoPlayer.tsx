import { useState, useRef, RefObject } from "react";

export const useVideoPlayer = (
  videoRef: RefObject<HTMLVideoElement>,
  progressBarRef: RefObject<HTMLInputElement>
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef<number>();

  const onLoadedMetadata = () => {
    if (videoRef.current && progressBarRef.current) {
      const seconds = Math.floor(videoRef.current.duration);
      setDuration(seconds);
      progressBarRef.current.max = String(seconds);
    }
  };

  const updateCurrentTime = () => {
    if (progressBarRef.current) {
      setCurrentTime(Number(progressBarRef.current.value));
    }
  };

  // Play the video and start the animation frame
  const play = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  // Pause the video and cancel the animation frame
  const pause = () => {
    if (videoRef.current && animationRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Reset the progress bar and current time
  const reset = () => {
    if (!progressBarRef.current) return;
    setIsPlaying(false);
    progressBarRef.current.value = "0";
    updateCurrentTime();
  };

  // Update the progress bar and current time as the video plays
  const whilePlaying = () => {
    if (progressBarRef.current && videoRef.current) {
      progressBarRef.current.value = Math.floor(
        videoRef.current.currentTime
      ).toString();
      progressBarRef.current.style.setProperty(
        "--seek-before-width",
        `${(Number(progressBarRef.current.value) / duration) * 100}%`
      );
      updateCurrentTime();

      // If the video is over, reset the progress bar and pause the video
      if (Number(progressBarRef.current.value) === duration) {
        reset();
        return;
      }

      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  // Toggle between playing and pausing the video
  const togglePlaying = () => {
    const prevState = isPlaying;
    setIsPlaying(!prevState);

    !prevState ? play() : pause();
  };

  // Change the status of the progress bar
  const changeProgressBarStatus = () => {
    if (videoRef.current && progressBarRef.current) {
      const currentProgressValue = Number(progressBarRef.current.value);

      videoRef.current.currentTime = currentProgressValue;
      setCurrentTime(currentProgressValue);
      progressBarRef.current.style.setProperty(
        "--seek-before-width",
        `${(currentProgressValue / duration) * 100}%`
      );
    }
  };

  // Update the progress bar and  current time when the user changes the progress manually
  const updateTime = (newTime: number) => {
    if (progressBarRef.current) {
      progressBarRef.current.value = String(newTime);
      updateCurrentTime();
      changeProgressBarStatus();
    }
  };

  // Jump back 10 seconds in the video
  const jumpBackTenSeconds = () => {
    if (progressBarRef.current) {
      updateTime(Number(progressBarRef.current.value) - 10);
    }
  };

  // Jump forward 10 seconds in the video
  const jumpForwardTenSeconds = () => {
    if (progressBarRef.current) {
      updateTime(Number(progressBarRef.current.value) + 10);
    }
  };

  return {
    jumpBackTenSeconds,
    jumpForwardTenSeconds,
    changeProgressBarStatus,
    onLoadedMetadata,
    togglePlaying,
    play,
    currentTime,
    duration,
    isPlaying,
  };
};
