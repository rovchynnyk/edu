import type { OnProgressProps } from 'react-player/base';

export const shouldBeRewarded = () => {
  // const lastLoginDate = localStorage.getItem('lastLoginDate');
  // const currentDate = new Date().toDateString();

  // if (lastLoginDate !== currentDate) {
  //   localStorage.setItem('lastLoginDate', currentDate);

  //   return true;
  // }

  // return false;

  const { count = 1 } = JSON.parse(localStorage.getItem('lastLogin')!);

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
  id,
  subject,
}: {
  progress: OnProgressProps | null;
  id: string | number;
  subject?: string;
}) => {
  localStorage.setItem(
    'lastUnfinishedVideo',
    JSON.stringify({
      progress,
      id,
      subject,
    })
  );
};
