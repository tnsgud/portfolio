import 'css/App.css';
import Main from 'pages/Main';
import Projects from 'pages/Projects';
import Skills from 'pages/Skills';
import { useEffect, useRef } from 'react';

function App() {
  const components: JSX.Element[] = [<Main />, <Skills />, <Projects />];
  const containerRef = useRef<HTMLDivElement>(null);
  const pageableRef = useRef<any>(null);

  const loadPageable = async () => {
    const Pageable = (await import('pageable')).default;
    const pageable = new Pageable(containerRef.current, {
      childSelector: '[data-anchor]',
      anchors: [],
      pips: true,
      animation: 300,
      delay: 0,
      throttle: 50,
      orientation: 'vertical' as 'vertical' | 'horizontal',
      swipeThreshold: 50,
      freeScroll: false,
      navPrevEl: true,
      navNextEl: true,
      infinite: false,
      events: {
        wheel: true,
        mouse: true,
        touch: true,
        keydown: true,
      },
      easing: (
        currentTime: number,
        startPos: number,
        endPos: number,
        interval: number
      ) => {
        return (
          -endPos * (currentTime /= interval) * (currentTime - 2) + startPos
        );
      },
      // onScroll: ()=>{},
      // onInit: () => {},
      // onUpdate: (data) => {}
      // onBeforeStart: () => {},
      // onStart: () => {},
      // onFinish: () => {}
    });

    pageableRef.current = pageable;
  };

  useEffect(() => {
    loadPageable();
  });

  return (
    <>
      <div className='pg-wrapper'>
        <main id='container' className='pg-container' ref={containerRef}>
          {components.map((component, index) => {
            return (
              <div
                key={index}
                data-anchor={`page-${index}`}
                className='pg-page'
              >
                {component}
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
