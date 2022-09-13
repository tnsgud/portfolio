import 'css/Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { TypingMultiline } from 'react-kr-typing-anim';
import { useState } from 'react';

const Main = () => {
  const [isDone, setIsDone] = useState(false);

  return (
    <div className='container'>
      <TypingMultiline
        className='test'
        Tag='h1'
        preDelay={100}
        postDelay={100}
        fixedWidth
        onDone={() => setIsDone(true)}
        cursor
        strs={`협업의 중요성을
              알고 있는 개발자
              박순형입니다.`}
      />
      <FontAwesomeIcon
        className='icon'
        icon={faArrowDown}
        size={'2x'}
        style={{ display: isDone ? '' : 'none' }}
      />
    </div>
  );
};

export default Main;
