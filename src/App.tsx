import React from 'react';
import 'css/App.css';
import Typewriter from 'typewriter-effect';
import { useState } from 'react';

function App() {
  const [isDone, setIsDone] = useState(false);
  const information: string[] = [
    '이름 : 박순형',
    '생일 : 2004.02.29',
    '학교 : 인천전자마이스터 고등학교 (재학중)',
    'Skills : Java, React, Vue, Typescript, Flutter',
  ];
  const navigationCaption: string[] = ['소개', '활동', '자격증', '수상경력'];

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
        <section className='informationSection'>
          <div className='informationDiv'>
            {isDone && <img id='photo' src='/image/profile.jpg' alt='' />}
            {isDone &&
              information.map((info) => (
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
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString('프론트 엔드 개발자를<br/>')
                .pauseFor(100)
                .typeString('꿈꾸는<br/>')
                .pauseFor(100)
                .typeString('박순형입니다.')
                .start()
                .callFunction(() => {
                  setIsDone(true);
                });
            }}
            options={{
              wrapperClassName: 'title',
            }}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
