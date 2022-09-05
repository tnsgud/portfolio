import 'css/App.css';
import Main from 'components/Main';
import { MouseEvent, useEffect, useRef, useState } from 'react';

function App() {
  const [navigators, setNavigators] = useState<boolean[]>(Array(4).fill(false));
  const components: JSX.Element[] = [<Main />, <Main />, <Main />, <Main />];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let arr = Array(4).fill(false);
    arr[0] = true;
    setNavigators(arr);
  }, []);

  const onNavigatorClick = (e: MouseEvent<HTMLButtonElement>) => {
    let arr: boolean[] = Array(4).fill(false);
    const index = Number(e.currentTarget.id);

    console.log(ref.current?.scrollHeight);
    ref.current?.scrollTo({ top: 2000, behavior: 'smooth' });

    arr[index] = true;
    window.scrollTo({ top: 400, behavior: 'smooth' });

    setNavigators(arr);
  };

  return (
    <>
      <header>
        {navigators.map((isSelected, index) => (
          <button
            key={index}
            id={`${index}`}
            onClick={onNavigatorClick}
            className='navigator'
            style={{ color: `${isSelected ? 'white' : 'gray'}` }}
          >
            ●
          </button>
        ))}
      </header>
      <div className='main' ref={ref}>
        {components.map((component, index) => (
          <div key={index} className='content'>
            {component}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
