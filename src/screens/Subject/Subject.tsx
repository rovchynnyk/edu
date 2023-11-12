import { Link, useParams } from 'react-router-dom';

import { Player } from '../../shared/Player/Player';

import { subjectsMap } from '../../shared/mocks/subjectsMock';

export const Subject = () => {
  const { subject = '' } = useParams() ?? {};

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

      {lessons.map((lesson, index) => {
        return <Player id={index} url={lesson} subject={subject} key={index} />;
      })}
    </div>
  );
};
