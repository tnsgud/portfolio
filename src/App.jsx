import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lobby from './pages/Lobby';
import SkillFloor from './pages/SkillFloor';
import Projects from './pages/Projects';
import LearningFloor from './pages/LearningFloor';
import BlogFloor from './pages/BlogFloor';
import GameTransition from './components/GameTransition';

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [transitionState, setTransitionState] = useState('idle');
  const [targetZone, setTargetZone] = useState('');

  const zoneLabel = {
    '/': 'TITLE',
    '/skills': 'ABILITIES',
    '/projects': 'MISSIONS',
    '/learning': 'TRAINING',
    '/blog': 'CODEX',
  };

  const goToZone = useCallback((path) => {
    if (transitionState !== 'idle' || path === location.pathname) return;

    setTargetZone(zoneLabel[path]);
    setTransitionState('closing');

    setTimeout(() => {
      setTransitionState('changing');
      navigate(path);
      setTimeout(() => {
        setTransitionState('opening');
        setTimeout(() => {
          setTransitionState('idle');
          setTargetZone('');
        }, 400);
      }, 200);
    }, 600);
  }, [transitionState, location.pathname, navigate]);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <div className="relative">
      <GameTransition
        isTransitioning={transitionState !== 'idle'}
        targetZone={targetZone}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate={transitionState === 'idle' || transitionState === 'opening' ? 'animate' : 'initial'}
        >
          <Routes location={location}>
            <Route
              path="/"
              element={
                <Lobby
                  onFloorChange={goToZone}
                  disabled={transitionState !== 'idle'}
                />
              }
            />
            <Route
              path="/skills"
              element={
                <SkillFloor
                  onFloorChange={goToZone}
                  disabled={transitionState !== 'idle'}
                />
              }
            />
            <Route
              path="/projects"
              element={
                <Projects
                  onFloorChange={goToZone}
                  disabled={transitionState !== 'idle'}
                />
              }
            />
            <Route
              path="/learning"
              element={
                <LearningFloor
                  onFloorChange={goToZone}
                  disabled={transitionState !== 'idle'}
                />
              }
            />
            <Route
              path="/blog"
              element={
                <BlogFloor
                  onFloorChange={goToZone}
                  disabled={transitionState !== 'idle'}
                />
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
