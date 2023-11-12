import type { OnProgressProps } from 'react-player/base';

export const shouldBeRewarded = () => {
  const { count = 1 } = JSON.parse(localStorage.getItem('lastLogin')!) ?? {};

  localStorage.setItem(
    'lastLogin',
    JSON.stringify({
      date: new Date().toDateString(),
      count: count + 1,
    })
  );

  return count === 1;
};

export const savePlaybackTime = ({
  progress,
  url,
  id,
  subject,
}: {
  progress: OnProgressProps | null;
  id: string | number;
  url: string;
  subject?: string;
}) => {
  const lastVideos = JSON.parse(localStorage.getItem('lastUnfinishedVideo')!);

  localStorage.setItem(
    'lastUnfinishedVideo',
    JSON.stringify({
      ...lastVideos,
      [url]: {
        progress,
        id,
        subject,
      },
    })
  );
};
