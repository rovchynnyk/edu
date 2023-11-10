import { Link, useParams } from 'react-router-dom';

import { Player } from '../../shared/Player/Player';

const subjectsMap = {
  mathematics: {
    title: 'Mathematics',
    lessons: [
      {
        title: 'Properties of Plane Shapes',
        video: {
          id: '1',
          url: 'https://drive.google.com/uc?id=1EnRRKw7aiNnij_TdOPBsFcY_D7Af78KV',
        },
      },
    ],
  },
} as const;

export const Subject = () => {
  const { subject } =
    (useParams() as { subject: keyof typeof subjectsMap }) ?? {};

  const { title = '', lessons = [] } = subjectsMap[subject] ?? {};

  return (
    <div role="presentation" className="cursor-pointer">
      <div className="flex flex-row mb-36">
        <Link to="/" className="mr-24 text-xl">
          &larr;
        </Link>

        <div>
          <h3 className="text-2xl">{title}</h3>

          <span className="text-sm opacity-50">16 Chapters / 140 Lessons</span>
        </div>
      </div>

      {lessons.map(({ video }, index) => {
        return <Player {...video} key={index} />;
      })}
    </div>
  );
};
