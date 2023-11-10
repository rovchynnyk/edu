import React, { useRef } from 'react';
import ReactPlayer from 'react-player';

const videos = [
  'https://drive.google.com/uc?id=1EnRRKw7aiNnij_TdOPBsFcY_D7Af78KV',
  'https://drive.google.com/uc?id=1LFaGpogmfalRWVZ4-IvxpSCRX3kh3BMp',
  'https://drive.google.com/uc?id=1R8UGFePHQCMZA6aLlnp4kGWjUCWqjpTu',
  'https://drive.google.com/uc?id=1Wi6CWu1zt1y4Cq0JodZurc7KJdYF2KKp',
  'https://drive.google.com/uc?id=1jgwX8_gwGuwg5OJ_J0Nrmql5eL-ierpq',
];

export const Videos = () => {
  const playerRef = useRef<ReactPlayer>(null);

  return (
    <>
      <ReactPlayer controls ref={playerRef} url={videos[0]} />
      <button>Add bookmark</button>
    </>
  );
};
