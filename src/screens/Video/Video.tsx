import { useParams } from 'react-router-dom';

import { Player } from '../../shared/Player/Player';
import { subjectsMap } from '../../shared/mocks/subjectsMock';

export const Video = () => {
  const { subject = '', video = 0 } = useParams() ?? {};

  const { lessons } = subjectsMap[subject] ?? {};

  return <Player id={video} url={lessons[video] ?? 0} />;
};
