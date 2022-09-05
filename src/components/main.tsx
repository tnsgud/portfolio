import 'css/Main.css';
import { useState, MouseEvent } from 'react';
import { TypingMultiline } from 'react-kr-typing-anim';

const Main = () => {
  const [isDone, setIsDone] = useState(false);

  const onAboutClick = (e: MouseEvent<HTMLButtonElement>) => {
    alert('on click');
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
        strs={`프론트엔드를
      꿈꾸는
      박순형입니다.`}
      />
      {isDone && (
        <button className='aboutButton' onClick={onAboutClick}>
          About me
        </button>
      )}
    </div>
  );
};

export default Main;
