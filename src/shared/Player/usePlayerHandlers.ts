import { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { toast } from 'react-toastify';

import { shouldBeRewarded, savePlaybackTime } from '../utils';

import { Direction } from './components';

import type { BookmarkT } from './components/ProgressBar';
import type { OnProgressProps } from 'react-player/base';

type PropsT = Readonly<{
  togglePlay: () => void;
  id: string | number;
  url: string;
  subject?: string;
}>;

export const usePlayerHandlers = ({ togglePlay, ...video }: PropsT) => {
  const [duration, setDuration] = useState(0);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [playerReady, setPlayerReady] = useState<ReactPlayerProps | null>(null);
  const [progress, setProgress] = useState<OnProgressProps | null>(
    JSON.parse(localStorage.getItem('lastUnfinishedVideo')!)?.[video.url]
      ?.progress
  );

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

  const handleVideoEnd = useCallback(() => {
    togglePlay();

    if (shouldBeRewarded()) {
      toast.success('You have been rewarded with 10 points!');
    }

    const lastVideos = JSON.parse(localStorage.getItem('lastUnfinishedVideo')!);

    delete lastVideos[video.url];

    localStorage.setItem('lastUnfinishedVideo', JSON.stringify(lastVideos));
  }, [togglePlay, video.url]);

  useEffect(() => {
    return () => {
      const { id, url, subject } = video;

      savePlaybackTime({ progress, url, id, subject });
    };
  }, [progress, video]);

  return {
    activeNote,
    duration,
    progress,
    playerReady,
    playerRef,
    playerContainerRef,
    handleSkip,
    handleMarkerClick,
    handleVideoEnd,
    handleFullScreen,
    handleProgress: setProgress,
    handleDuration: setDuration,
    handlePlayerReady: setPlayerReady,
  };
};
