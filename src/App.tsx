import 'css/App.css';
import Main from 'components/Main';

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
    <main>
      {navigationCaption.map((caption, i) => {
        return (
          <section key={i} id={caption}>
            {caption}
            {components[i]}
          </section>
        );
      })}
    </main>
  );
}

export default App;
