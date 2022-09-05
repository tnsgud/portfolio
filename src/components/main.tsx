import 'css/Main.css';
import { useState, MouseEvent } from 'react';
import { TypingMultiline } from 'react-kr-typing-anim';

const Main = () => {
  const [isDone, setIsDone] = useState(false);

  const onAboutClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsDone(true);
  };
  return (
    <div className='title'>
      <TypingMultiline
        Tag='h1'
        preDelay={1000}
        postDelay={1000}
        fixedWidth
        onDone={() => setIsDone(true)}
        cursor
        strs={`프론트엔드 개발자
      박순형입니다.`}
      />
      <button
        style={
          isDone
            ? {}
            : {
                backgroundColor: '#121212',
                color: '#121212',
              }
        }
        className='aboutButton'
        onClick={onAboutClick}
      >
        About me
      </button>
    </div>
  );
};

export default Main;
