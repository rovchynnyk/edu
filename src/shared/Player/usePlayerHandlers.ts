import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';

import { shouldBeRewarded, savePlaybackTime } from '../utils';

import { Direction } from './components';

import type { BookmarkT } from './components/ProgressBar';
import type { OnProgressProps } from 'react-player/base';

type PropsT = Readonly<{
  togglePlay: () => void;
  id: string | number;
  subject?: string;
}>;

export const usePlayerHandlers = ({ togglePlay, ...video }: PropsT) => {
  const [duration, setDuration] = useState(0);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [progress, setProgress] = useState<OnProgressProps | null>(null);

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReactPlayer>(null);

  const handleFullScreen = () => {
    if (!playerContainerRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    }
  };

  const handleMarkerClick = (bookmark: BookmarkT) => {
    if (!playerRef.current) return;

    setActiveNote(bookmark.note);

    playerRef.current.seekTo(bookmark.time, 'seconds');
  };

  const handleSkip = (direction: keyof typeof Direction) => {
    const player = playerRef.current;

    if (!player) return;

    const amount = direction === Direction.back ? -10 : 10;

    const currentTime = player.getCurrentTime();

    player.seekTo(currentTime + amount, 'seconds');
  };

  const handleVideoEnd = () => {
    togglePlay();

    if (shouldBeRewarded()) {
      toast.success('You have been rewarded with 10 points!');
    }

    localStorage.removeItem('lastUnfinishedVideo');
  };

  const handleProgress = (progress: OnProgressProps) => {
    setProgress(progress);
    savePlaybackTime(progress?.playedSeconds ?? 0, video.id, video.subject);
  };

  useEffect(() => {
    const player = playerRef.current;

    if (!player) return;

    const lastPlayback = localStorage.getItem('lastUnfinishedVideo');

    const { progress: lastProgress = 0 } = lastPlayback
      ? JSON.parse(lastPlayback)
      : {};

    if (lastProgress) {
      player.seekTo(parseFloat(lastProgress));
    }
  }, []);

  return {
    activeNote,
    duration,
    progress,
    playerRef,
    playerContainerRef,
    handleSkip,
    handleProgress,
    handleMarkerClick,
    handleVideoEnd,
    handleFullScreen,
    handleDuration: setDuration,
  };
};
