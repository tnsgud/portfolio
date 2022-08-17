import Typewriter from 'typewriter-effect';
import 'css/main.css';

const Main = () => {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString('프론트 엔드 개발자를<br/>')
          .pauseFor(100)
          .typeString('꿈꾸는<br/>')
          .pauseFor(100)
          .typeString('박순형입니다.')
          .start();
      }}
      options={{
        wrapperClassName: 'title',
        cursorClassName: 'cursor',
      }}
    />
  );
};

export default Main;
