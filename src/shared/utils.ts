export const shouldBeRewarded = () => {
  // const lastLoginDate = localStorage.getItem('lastLoginDate');
  // const currentDate = new Date().toDateString();

  // if (lastLoginDate !== currentDate) {
  //   localStorage.setItem('lastLoginDate', currentDate);

  //   return true;
  // }

  // return false;
  const lastLogin = localStorage.getItem('lastLogin');

  const { count = 1 } = lastLogin ? JSON.parse(lastLogin) : {};

  const currentDate = new Date().toDateString();

  localStorage.setItem(
    'lastLogin',
    JSON.stringify({
      date: currentDate,
      count: count + 1,
    })
  );

  console.log(count);

  return count === 1;
};

export const savePlaybackTime = (
  progress: number,
  id: string | number,
  subject?: string
) => {
  localStorage.setItem(
    'lastUnfinishedVideo',
    JSON.stringify({
      progress,
      id,
      subject,
    })
  );
};
