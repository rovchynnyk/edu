import { useCallback, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ReactPlayer from 'react-player';

import PlayIcon from './assets/play.svg';
import PauseIcon from './assets/pause.svg';
import ExpandIcon from './assets/expand.svg';
import BookmarkIcon from './assets/bookmark.svg';
import ShareIcon from './assets/share.svg';
import CcIcon from './assets/cc.svg';

import { usePlayerHandlers } from './usePlayerHandlers';

import { SeekButton, ProgressBar, NoteModal } from './components';

import 'react-toastify/dist/ReactToastify.css';

import type { BookmarkT } from './components/ProgressBar';

type PropsT = Readonly<{
  id: string | number;
  url: string;
  subject?: string;
}>;

export const Player = ({ id, url, subject }: PropsT) => {
  const [playing, setPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<
    Record<string, ReadonlyArray<BookmarkT>>
  >({});
  const [playbackTime, setPlaybackTime] = useState(0);

  const togglePlay = useCallback(() => {
    setPlaying(!playing);
  }, [playing]);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const {
    duration,
    progress,
    playerRef,
    handleSkip,
    activeNote,
    playerReady,
    playerContainerRef,
    handleProgress,
    handleDuration,
    handleMarkerClick,
    handleFullScreen,
    handleVideoEnd,
    handlePlayerReady,
  } = usePlayerHandlers({ togglePlay, id, url, subject });

  const addBookmark = useCallback(
    (note: string) => {
      const newBookmark = {
        percentage: (playbackTime / duration) * 100,
        time: playbackTime,
        note,
      };

      const videoBookmarks = bookmarks?.[url] ?? [];

      const updatedBookmarks = {
        ...bookmarks,
        [url]: [...videoBookmarks, newBookmark],
      };

      setBookmarks(updatedBookmarks);

      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    },
    [bookmarks, playbackTime, duration, url]
  );

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')!);

    setBookmarks(savedBookmarks);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const cacheResponse = await caches.match(url);

  //       if (cacheResponse) {
  //         const blob = await cacheResponse.blob();

  //         setVideoUrl(URL.createObjectURL(blob));
  //       } else {
  //         setVideoUrl(url);
  //       }
  //     } catch (error) {
  //       console.error('Error when trying to load video from cache:', error);

  //       setVideoUrl(url);
  //     }
  //   })();
  // }, [url]);

  const handleStart = () => {
    playerRef.current?.seekTo(progress?.playedSeconds ?? 0);
  };

  useEffect(() => {
    const player = playerRef.current;

    if (player && playerReady) {
      setTimeout(() => {
        player.seekTo(progress?.playedSeconds ?? 0);
      }, 1000);
    }
  }, [playerReady, playerRef]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="relative group mb-24" ref={playerContainerRef}>
        <ReactPlayer
          muted
          url={url}
          ref={playerRef}
          playing={playing}
          controls={false}
          width="100%"
          height="100%"
          onDuration={handleDuration}
          onProgress={handleProgress}
          onEnded={handleVideoEnd}
          onReady={handlePlayerReady}
          onStart={handleStart}
        />

        {playerReady ? (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <SeekButton direction="back" handleSkip={handleSkip} />

            <button
              onClick={togglePlay}
              className="absolute top-2/4 left-2/4 w-80 h-80 -translate-x-2/4 -translate-y-2/4"
            >
              <img
                className="w-full h-full"
                src={playing ? PauseIcon : PlayIcon}
                alt={playing ? 'pause' : 'play'}
              />
            </button>

            <SeekButton direction="forward" handleSkip={handleSkip} />

            <ProgressBar
              bookmarks={bookmarks?.[url]}
              progress={progress}
              duration={duration}
              playerElement={playerRef.current}
              onHandleMarkerClick={handleMarkerClick}
            />

            <div className="absolute bottom-32 left-48">
              <button
                className="mr-24"
                onClick={() => {
                  setPlaybackTime(progress?.playedSeconds ?? 0);
                  toggleModal();
                }}
              >
                <img src={BookmarkIcon} alt="bookmark" />
              </button>

              <button>
                <img src={ShareIcon} alt="share" />
              </button>
            </div>

            <div className="absolute bottom-32 right-48">
              <button className="mr-24">
                <img src={CcIcon} alt="cc" />
              </button>

              <button onClick={handleFullScreen}>
                <img src={ExpandIcon} alt="expand" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {activeNote ? (
        <div className="inline-flex bg-white p-8 rounded-lg">
          <p>{activeNote}</p>
        </div>
      ) : null}

      <NoteModal
        modalIsOpen={modalOpen}
        toggleModal={toggleModal}
        onAddBookmark={addBookmark}
      />

      <ToastContainer />
    </>
  );
};
