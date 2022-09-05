import 'css/App.css';
import Main from 'components/Main';
import { MouseEvent, useEffect, useState } from 'react';

function App() {
  const [navigators, setNavigators] = useState<boolean[]>(Array(4).fill(false));
  const navigationCaption: string[] = ['main0', 'main1', 'main2', 'main3'];
  const components: JSX.Element[] = [<Main />, <Main />, <Main />, <Main />];

  const changeNavigation = (index: number) => {
    let arr: boolean[] = Array(4).fill(false);

    arr[index] = true;

    document.getElementById(`${index}`)?.click();

    setNavigators(arr);
  };

  const onNavigatorClick = (e: MouseEvent<HTMLAnchorElement>) =>
    changeNavigation(Number(e.currentTarget.id));

  function logit(e: WheelEvent) {
    const currentIndex = navigators.indexOf(true);

    if (e.deltaY < 0 && currentIndex !== 0) {
      changeNavigation(currentIndex - 1);
    } else if (e.deltaY > 0 && currentIndex !== 3) {
      changeNavigation(currentIndex + 1);
    }
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('wheel', logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener('wheel', logit);
    };
  });

  useEffect(() => {
    let arr = Array(4).fill(false);
    arr[0] = true;
    setNavigators(arr);
  }, []);

  return (
    <>
      <header>
        {navigators.map((isSelected, index) => (
          <a
            key={index}
            id={`${index}`}
            onClick={onNavigatorClick}
            href={`#${navigationCaption[index]}`}
            className='navigator'
            style={{ color: `${isSelected ? 'white' : 'gray'}` }}
          >
            ●
          </a>
        ))}
      </header>
      <main>
        {components.map((component, index) => (
          <section key={index} id={`${navigationCaption[index]}`}>
            {component}
          </section>
        ))}
      </main>
    </>
  );
}

export default App;
