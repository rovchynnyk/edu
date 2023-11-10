import { Link } from 'react-router-dom';

import mathIcon from './assets/math.svg';
import englishIcon from './assets/english.svg';
import chemistryIcon from './assets/chemistry.svg';
import biologyIcon from './assets/biology.svg';
import physicsIcon from './assets/physics.svg';
import economicsIcon from './assets/economics.svg';
import accountingIcon from './assets/accounting.svg';
import literatureIcon from './assets/literature.svg';
import governmentIcon from './assets/government.svg';

import { colors } from '../../../tailwind/colors';

const sectionsMap = [
  {
    id: 'mathematics',
    title: 'Mathematics',
    icon: mathIcon,
    path: '/subject/mathematics',
  },
  {
    id: 'english',
    title: 'English Language',
    icon: englishIcon,
    path: '',
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    icon: chemistryIcon,
    path: '',
  },
  {
    id: 'biology',
    title: 'Biology',
    icon: biologyIcon,
    path: '',
  },
  {
    id: 'physics',
    title: 'Physics',
    icon: physicsIcon,
    path: '',
  },
  {
    id: 'economics',
    title: 'Economics',
    icon: economicsIcon,
    path: '',
  },
  {
    id: 'accounting',
    title: 'Accounting',
    icon: accountingIcon,
    path: '',
  },
  {
    id: 'literature',
    title: 'Literature in English',
    icon: literatureIcon,
    path: '',
  },
  {
    id: 'government',
    title: 'Government',
    icon: governmentIcon,
    path: '',
  },
] as const;

export const Sections = () => {
  return (
    <div className="text-left mb-60">
      <h2 className="text-lg mb-24">Watch Video Lessons</h2>

      <div className="flex flex-wrap">
        {sectionsMap.map(({ id, title, path, icon }) => {
          return (
            <Link
              key={id}
              to={path}
              className="flex justify-between shrink-0 text-white rounded-xl text-xs p-16 mb-8 mr-20 w-180 h-80"
              style={{ backgroundColor: colors[id].primary }}
            >
              <img src={icon} alt={title} className="w-24 h-24 mr-24" />

              <h3 className="inline-flex self-end text-right uppercase tracking-widest font-bold">
                {title}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
