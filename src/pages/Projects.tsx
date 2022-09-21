import { useEffect, useRef } from 'react';

const Projects = () => {
  const pageableRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadPageable = async () => {
    const Pageable = (await import('pageable')).default;
    const pageable = new Pageable(containerRef.current, {
      childSelector: '[projects-child]',
      anchors: [],
      pips: false,
      animation: 300,
      delay: 0,
      throttle: 50,
      orientation: 'horizontal' as 'vertical' | 'horizontal',
      swipeThreshold: 50,
      freeScroll: false,
      navPrevEl: true,
      navNextEl: true,
      infinite: false,
      events: {
        wheel: false,
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
      // onScroll: () => {},
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
    <div className='pg-wrapper'>
      <div className='pg-container' ref={containerRef}>
        <div
          className='pg-page'
          projects-child='project-page-1'
          style={{
            width: '100vw',
            height: '80vh',
            backgroundColor: 'red',
          }}
        >
          hello
        </div>
        <div
          className='pg-page'
          projects-child='project-page-2'
          style={{
            width: '100vw',
            height: '80vh',
            backgroundColor: 'blue',
          }}
        >
          hello
        </div>
        <div
          className='pg-page'
          projects-child='project-page-3'
          style={{
            width: '100vw',
            height: '80vh',
            backgroundColor: '#ffffff',
          }}
        >
          hello
        </div>
      </div>
    </div>
  );
};

export default Projects;
