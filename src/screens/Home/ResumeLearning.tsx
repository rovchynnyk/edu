import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import ResumeIcon from './assets/resume.svg';

export const ResumeLearning = () => {
  useEffect(() => {
    const lastWatchedTime = localStorage.getItem('lastPlaybacks') ?? '';

    console.log(lastWatchedTime);
  }, []);

  return (
    <div className="mb-36">
      <h3>Resume learning</h3>

      <div className="flex items-center justify-between py-20 px-32 text-white rounded-lg bg-orange w-1/2 h-100">
        <img src={ResumeIcon} alt="Resume Video" />

        <div>
          <p className="">Properties of Plane shapes</p>

          <span className="font-title text-sm opacity-70">
            You've watched 3 of 7 lessons
          </span>
        </div>

        <Link
          to="/"
          className="flex items-center justify-center w-50 h-50 rounded-full text-2xl bg-white bg-opacity-20"
        >
          &rarr;
        </Link>
      </div>
    </div>
  );
};
