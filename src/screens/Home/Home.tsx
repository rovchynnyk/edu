import { LiveClasses } from './LiveClasses';
import { Sections } from './Sections';
import { ResumeLearning } from './ResumeLearning';

export const Home = () => {
  return (
    <>
      <ResumeLearning />

      <Sections />

      <LiveClasses />
    </>
  );
};
