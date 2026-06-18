import { useState } from 'react';
import { motion } from 'framer-motion';
import GameHUD from '../components/GameHUD';
import ScanLines from '../components/ScanLines';

export default function MainMenu({ onFloorChange, disabled }) {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="relative min-h-screen bg-dark-bg overflow-hidden flex flex-col items-center justify-center">
      <ScanLines />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Corner decals */}
      <div className="fixed top-0 left-0 w-14 h-14 border-l-2 border-t-2 border-neon-cyan/20" />
      <div className="fixed top-0 right-0 w-14 h-14 border-r-2 border-t-2 border-neon-cyan/20" />
      <div className="fixed bottom-0 left-0 w-14 h-14 border-l-2 border-b-2 border-neon-cyan/20" />
      <div className="fixed bottom-0 right-0 w-14 h-14 border-r-2 border-b-2 border-neon-cyan/20" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

      <GameHUD onZoneChange={onFloorChange} disabled={disabled} />

      {/* Title screen */}
      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Game logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-8"
        >
          {/* Glitch layers */}
          <div
            className="text-6xl sm:text-8xl font-black text-neon-cyan select-none relative"
            style={{ textShadow: '0 0 30px rgba(0,240,255,0.5), 0 0 60px rgba(0,240,255,0.3)' }}
          >
            <span className="relative z-10">CYBERFUNK</span>
            <span
              className="absolute top-0 left-0 z-0 text-neon-pink opacity-40 pointer-events-none"
              style={{
                clipPath: 'inset(20% 0 40% 0)',
                transform: 'translateX(-3px)',
                animation: 'glitch 3s infinite',
              }}
            >
              CYBERFUNK
            </span>
            <span
              className="absolute top-0 left-0 z-0 text-neon-purple opacity-40 pointer-events-none"
              style={{
                clipPath: 'inset(50% 0 10% 0)',
                transform: 'translateX(3px)',
                animation: 'glitch 2s infinite reverse',
              }}
            >
              CYBERFUNK
            </span>
          </div>

          {/* Tagline */}
          <div className="text-center mt-3">
            <span className="text-xs text-gray-500 tracking-[0.3em]">
              PORTFOLIO v1.0
            </span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <p className="text-gray-400 text-sm text-center leading-relaxed">
            개발자 박순형의 포트폴리오
          </p>
        </motion.div>

        {/* Menu buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-3"
        >
          {[
            { path: '/skills', label: '⚡ SKILLS', desc: '능력치 보기' },
            { path: '/projects', label: '★ MISSIONS', desc: '프로젝트 기록' },
            { path: '/learning', label: '▲ TRAINING', desc: '학습 현황' },
            { path: '/blog', label: '◆ CODEX', desc: '개발 블로그' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => onFloorChange?.(item.path)}
              disabled={disabled}
              className="group relative w-64 py-2.5 text-left px-5 transition-all duration-300 bg-dark-card/50 hover:bg-dark-card/80"
              style={{
                border: '1px solid rgba(0, 240, 255, 0.1)',
                clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-neon-cyan group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                  <p className="text-[10px] text-gray-600 mt-0.5">{item.desc}</p>
                </div>
                <span className="text-gray-700 group-hover:text-neon-cyan transition-colors text-xs">{'>'}</span>
              </div>
              <div
                className="absolute left-0 bottom-0 h-[1px] bg-neon-cyan/30 group-hover:bg-neon-cyan/60 transition-all duration-300"
                style={{ width: '0%', boxShadow: '0 0 4px rgba(0,240,255,0.2)' }}
                onMouseEnter={(e) => e.currentTarget.style.width = '100%'}
                onMouseLeave={(e) => e.currentTarget.style.width = '0%'}
              />
            </button>
          ))}
        </motion.div>

        {/* Contact / Player Data */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <button
            onClick={() => setShowContact(!showContact)}
            className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors tracking-widest"
          >
            [ PLAYER DATA ]
          </button>

          {showContact && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-dark-card/80 backdrop-blur"
              style={{ border: '1px solid rgba(0, 240, 255, 0.15)', clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 100%, 0 100%)' }}
            >
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-neon-cyan w-20">NAME</span>
                  <span className="text-gray-300">박순형</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neon-cyan w-20">RANK</span>
                  <span className="text-gray-300">풀스택 개발자</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neon-cyan w-20">GITHUB</span>
                  <a href="https://github.com/tnsgud" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-neon-cyan transition-colors">
                    github.com/tnsgud
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neon-cyan w-20">EMAIL</span>
                  <a href="mailto:qkrtnsgud0229@gmail.com" className="text-gray-300 hover:text-neon-cyan transition-colors">
                    qkrtnsgud0229@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom instruction */}
        <div className="absolute bottom-24 text-[10px] text-gray-800 tracking-[0.4em] animate-pulse">
          SELECT ZONE
        </div>
      </div>
    </div>
  );
}
