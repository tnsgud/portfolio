import 'css/App.css';
import Typewriter from 'typewriter-effect';
import Main from 'components/main';

function App() {
  const information: string[] = [
    '이름 : 박순형',
    '생일 : 2004.02.29',
    '학교 : 인천전자마이스터 고등학교 (재학중)',
    'Skills : Java, React, Vue, Typescript, Flutter',
  ];
  const navigationCaption: string[] = [
    'main',
    '소개',
    '활동',
    '자격증',
    '수상경력',
  ];
  const components: JSX.Element[] = [<Main />];

  return (
    <div>
      <header>
        <h1>박순형</h1>
        <ul>
          {navigationCaption.map((caption) => (
            <li key={caption}>
              <a className='nav' href={`#${caption}`}>
                {caption}
              </a>
            </li>
          ))}
        </ul>
      </header>
      <main>
        {navigationCaption.map((caption, i) => {
          return (
            <section key={i} id={caption}>
              {caption}
              {components[i]}
            </section>
          );
        })}
        <div className='informationDiv'>
          <img id='photo' src='/image/profile.jpg' alt='' />
          {information.map((info) => (
            <Typewriter
              key={info}
              onInit={(typewriter) => {
                typewriter.typeString(info).start();
              }}
              options={{
                cursor: '',
                wrapperClassName: 'information',
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
