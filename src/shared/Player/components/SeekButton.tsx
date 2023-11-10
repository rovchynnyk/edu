import SeekToIcon from '../assets/seekTo.svg';

export const Direction = {
  back: 'back',
  forward: 'forward',
};

type PropsT = Readonly<{
  direction: keyof typeof Direction;
  handleSkip: (direction: keyof typeof Direction) => void;
}>;

export const SeekButton = ({ direction, handleSkip }: PropsT) => {
  return (
    <button
      onClick={() => handleSkip(direction)}
      className={`absolute top-2/4 w-60 h-60 -translate-y-2/4 ${
        direction === Direction.back ? 'right-2/3' : 'left-2/3'
      }`}
    >
      <img
        src={SeekToIcon}
        alt="seek forward"
        className={`w-full h-full ${
          direction === Direction.back ? '-scale-x-100' : 'scale-x-100'
        }`}
      />

      <span className="text-white opacity-60 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        10s
      </span>
    </button>
  );
};
