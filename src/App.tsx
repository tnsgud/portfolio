import 'css/App.css';
import Main from 'components/Main';
import About from 'components/About';
import { MouseEvent, useEffect, useState } from 'react';

function App() {
  const navigationCaption: string[] = ['main', 'about'];
  const components: JSX.Element[] = [<Main />, <About />];
  const [navigators, setNavigators] = useState<boolean[]>(
    Array(components.length).fill(false)
  );

  useEffect(() => {
    window.addEventListener('wheel', mouseWheelEvent);
    window.addEventListener('keydown', keydownEvent);
    return () => {
      window.removeEventListener('wheel', mouseWheelEvent);
      window.removeEventListener('keydown', keydownEvent);
    };
  });

  useEffect(() => {
    let arr = Array(2).fill(false);
    arr[0] = true;
    setNavigators(arr);
  }, []);

  const changeNavigation = (index: number) => {
    if (index < 0 || index > navigators.length - 1) {
      return;
    }

    let arr: boolean[] = Array(navigators.length).fill(false);

    arr[index] = true;

    const element = document.getElementById(`${index}`);
    element?.click();

    setNavigators(arr);
  };

  const onNavigatorClick = (e: MouseEvent<HTMLAnchorElement>) => {
    changeNavigation(Number(e.currentTarget.id));
  };

  const mouseWheelEvent = (e: WheelEvent) => {
    const currentIndex = navigators.indexOf(true);

    if (e.deltaY < 0) {
      changeNavigation(currentIndex - 1);
    } else if (e.deltaY > 0) {
      changeNavigation(currentIndex + 1);
    }
  };

  const keydownEvent = (e: KeyboardEvent) => {
    let currentKey = e.key;

    if (currentKey !== 'ArrowDown' && currentKey !== 'ArrowUp') {
      return;
    }

    const currentIndex = navigators.indexOf(true);

    if (currentKey === 'ArrowUp') {
      changeNavigation(currentIndex - 1);
    } else {
      changeNavigation(currentIndex + 1);
    }
  };

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
