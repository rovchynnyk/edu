import { Link } from 'react-router-dom';

import { colors } from '../../../tailwind/colors';
import clockIcon from './assets/clock.svg';

const liveClassesMap = [
  {
    subject: 'Science & Technology',
    variant: 'orange',
    topic: 'Metallic & Non Metallic Properties and all Things red',
    teacher: 'Bella Thorne',
  },
  {
    subject: 'Primary English',
    variant: 'lavender',
    topic: 'Metallic & Non Metallic Properties and all Things red',
    teacher: 'Bella Thorne',
  },
  {
    subject: 'Primary Mathematics',
    variant: 'green',
    topic: 'Metallic & Non Metallic Properties and all Things red',
    teacher: 'Bella Thorne',
  },
] as const;

export const LiveClasses = () => {
  return (
    <div className="text-left mb-60">
      <div className="flex mb-24">
        <h2 className="mr-20">Join Live Classes</h2>

        <Link
          to="/"
          className="underline font-title text-lavender font-bold tracking-wider"
        >
          See all
        </Link>
      </div>

      <ul className="flex">
        {liveClassesMap.map(({ subject, teacher, topic, variant }, index) => {
          return (
            <li
              key={index}
              className="bg-white overflow-hidden rounded-xl w-240 mr-20 last:mr-0"
            >
              <div
                style={{ background: colors[variant] }}
                className="h-80 relative overflow-hidden"
              />

              <div className="p-16">
                <p className="text-sm" style={{ color: colors[variant] }}>
                  {subject}
                </p>

                <h4 className="my-8">{topic}</h4>

                <span className="font-semibold text-xs opacity-70 tracking-wider">
                  {teacher}
                </span>

                <hr className="my-8" />

                <div className="flex items-center justify-between text-xs">
                  <img src={clockIcon} alt="Time interval" />
                  <span>Started at 1:30 PM</span>
                  <button className="px-20 py-10 border border-solid rounded-lg">
                    JOIN
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
