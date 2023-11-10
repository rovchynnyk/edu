import { useParams } from 'react-router-dom';

import { Player } from '../../shared/Player/Player';

export const Video = () => {
  const l = useParams();
  console.log(l);

  return <Player url="" />;
};
