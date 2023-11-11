import localForage from 'localforage';

localForage.config({
  driver: localForage.LOCALSTORAGE,
  name: 'videoDatabase',
  storeName: 'videos',
});

export const savePlaybackState = async (
  videoUrl: string,
  playbackTime: number
) => {
  try {
    await localForage.setItem(videoUrl, playbackTime);

    console.log('Playback state saved');
  } catch (error) {
    console.error('Failed to save playback state', error);
  }
};

export const getPlaybackState = async (videoUrl: string) => {
  try {
    const playbackTime = await localForage.getItem(videoUrl);

    return playbackTime;
  } catch (error) {
    console.error('Failed to get playback state', error);
  }
};
