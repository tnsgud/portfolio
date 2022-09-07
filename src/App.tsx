import { useEffect, useRef } from 'react';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linearProgressBarRef = useRef<HTMLDivElement>(null);
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
      navPrevEl: false,
      navNextEl: false,
      infinite: true,
      events: {
        wheel: true,
        mouse: true,
        touch: true,
        keydown: true,
      },
      easing: (currentTime, startPos, endPos, interval) => {
        return (
          -endPos * (currentTime /= interval) * (currentTime - 2) + startPos
        );
      },
      onScroll: (data) => {
        updateLinearProgressBar(data);
      },
      // onInit: () => {},
      // onUpdate: (data) => {}
      // onBeforeStart: () => {},
      // onStart: () => {},
      // onFinish: () => {}
    });

    pageableRef.current = pageable;
  };

  const updateLinearProgressBar = (data) => {
    const pos = 1 - (data.max - data.scrolled) / data.max;
    const linearProgressBar = linearProgressBarRef.current;
    if (!linearProgressBar) return;
    linearProgressBar.style.transform = `scale(${pos}, 1)`;
  };

  useEffect(() => {
    loadPageable();
  }, []);

  return (
    <>
      <main className='indexPage pg-wrapper'>
        <div id='container' className='pg-container' ref={containerRef}>
          <div
            data-anchor='page-1'
            id='page-1'
            className='pg-page'
            style={{
              backgroundColor: 'peachpuff',
            }}
          ></div>
          <div
            data-anchor='page-2'
            className='pg-page'
            style={{
              backgroundColor: 'cornflowerblue',
            }}
          ></div>
          <div
            data-anchor='page-3'
            className='pg-page'
            style={{
              backgroundColor: 'bisque',
            }}
          ></div>
          <div
            data-anchor='page-4'
            className='pg-page'
            style={{
              backgroundColor: 'mediumaquamarine',
            }}
          ></div>
        </div>

        <div
          className='linear-progress'
          style={{
            position: 'fixed',
            top: '0px',
            left: '10px',
            width: 'calc(100vw - 20px)',
            height: '2px',
          }}
        >
          <div
            className='bar'
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundColor: '#84e8ff',
              transformOrigin: '0 0 0',
            }}
            ref={linearProgressBarRef}
          ></div>
        </div>
      </main>
    </>
  );
}

export default App;
