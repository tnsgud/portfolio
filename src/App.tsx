import 'css/App.css';
import Main from 'components/main';
import { MouseEvent, useEffect, useState } from 'react';

function App() {
  const [navigators, setNavigators] = useState<boolean[]>(Array(4).fill(false));
  const components: JSX.Element[] = [<Main />];

  useEffect(() => {
    let arr = Array(4).fill(false);
    arr[0] = true;
    setNavigators(arr);
  }, []);

  const onNavigatorClick = (e: MouseEvent<HTMLButtonElement>) => {
    let arr: boolean[] = Array(4).fill(false);
    arr[Number(e.currentTarget.id)] = true;

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
      <main>
        {components.map((component, index) => (
          <div key={index}>{component}</div>
        ))}
      </main>
    </>
  );
}

export default App;
