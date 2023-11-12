import ReactPlayer from 'react-player';

import type { OnProgressProps } from 'react-player/base';

export type BookmarkT = {
  percentage: number;
  note: string;
  time: number;
};

type PropsT = Readonly<{
  progress: OnProgressProps | null;
  duration: number;
  bookmarks: ReadonlyArray<BookmarkT>;
  playerElement: ReactPlayer | null;
  onHandleMarkerClick: (bookmark: BookmarkT) => void;
}>;

const formatTime = (seconds: number) => {
  return new Date(seconds * 1000).toISOString().slice(-13, -5);
};

export const ProgressBar = ({
  progress,
  duration,
  onHandleMarkerClick,
  playerElement,
  bookmarks = [],
}: PropsT) => {
  const { playedSeconds = 0, played = 0 } = progress ?? {};

  const handleProgressClick = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!playerElement) return;

    const bar = evt.currentTarget;
    const clickPositionInPage = evt.pageX;
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = playerElement.getDuration() / bar.offsetWidth;
    const timeToSeekTo = timePerPixel * clickPositionInBar;

    playerElement.seekTo(timeToSeekTo);
  };

  return (
    <div className="absolute bottom-100 inset-x-38 flex items-center">
      <span className="text-white opacity-60 font-bold">
        {formatTime(playedSeconds)}
      </span>

      <div
        className="relative h-4 mx-20 bg-gray shrink-0 grow"
        onClick={handleProgressClick}
      >
        <div className="bg-white h-4" style={{ width: `${played * 100}%` }} />

        {bookmarks.map((bookmark, index) => (
          <div
            key={index}
            className="absolute w-8 h-4 bg-red top-2/4 -translate-y-2/4"
            style={{ left: `${bookmark.percentage}%` }}
            onClick={() => onHandleMarkerClick(bookmark)}
          />
        ))}
      </div>

      <span className="text-white opacity-60 font-bold">
        {formatTime(duration)}
      </span>
    </div>
  );
};
