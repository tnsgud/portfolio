import { TypingMultiline } from 'react-kr-typing-anim';
import '../css/About.css';

const About = () => {
  const information: string[] = [
    '이름 : 박순형',
    '생일 : 04.02.29',
    '주소지 : 인천광역시 서구',
    '이메일 : qkrtnsgud0229@gmail.com',
  ];
  return (
    <div className='container'>
      {information.map((info) => {
        return <h1>{info}</h1>;
      })}
    </div>
  );
};

export default About;
