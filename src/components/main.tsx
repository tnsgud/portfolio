import 'css/Main.css';
import { TypingMultiline } from 'react-kr-typing-anim';

const Main = () => {
  return (
    <div className='title'>
      <TypingMultiline
        Tag='h1'
        preDelay={1000}
        postDelay={1000}
        fixedWidth
        onDone={() => console.log('done')}
        cursor
        strs={`프론트엔드를
      꿈꾸는
      박순형입니다.`}
      />
    </div>
  );
};

export default Main;
