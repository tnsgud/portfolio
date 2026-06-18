import { useLocation, useNavigate } from 'react-router-dom';

const zones = [
  { path: '/', label: 'TITLE', icon: '◈' },
  { path: '/skills', label: 'SKILLS', icon: '⚡' },
  { path: '/projects', label: 'MISSIONS', icon: '★' },
  { path: '/learning', label: 'TRAINING', icon: '▲' },
  { path: '/blog', label: 'CODEX', icon: '◆' },
];

export default function GameHUD({ onZoneChange, disabled }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (onZoneChange) {
      onZoneChange(path);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      {/* Top HUD bar */}
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div
          className="mx-4 mt-3 px-4 py-2 bg-dark-card/90 backdrop-blur-sm flex items-center justify-between"
          style={{
            border: '1px solid rgba(0, 240, 255, 0.2)',
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 12px 100%)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-neon-cyan text-sm font-bold tracking-wider animate-pulse-neon">COBA</span>
            <span className="text-gray-600 text-[10px]">LV.25</span>
            {/* XP bar */}
            <div className="w-24 h-2 bg-dark-surface overflow-hidden hidden sm:block"
              style={{ clipPath: 'polygon(0 0, calc(100% - 3px) 0, 100% 100%, 3px 100%)' }}
            >
              <div className="h-full bg-neon-cyan" style={{ width: '67%', boxShadow: '0 0 6px #00f0ff' }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neon-green">●</span>
            <span className="text-[10px] text-gray-500">ONLINE</span>
          </div>
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="flex justify-center px-4 pb-4">
          <div
            className="bg-dark-card/90 backdrop-blur-sm px-2 py-2 flex items-center gap-1"
            style={{
              border: '1px solid rgba(0, 240, 255, 0.15)',
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%)',
            }}
          >
            {zones.map((zone) => {
              const isActive = location.pathname === zone.path;
              return (
                <button
                  key={zone.path}
                  onClick={() => handleClick(zone.path)}
                  disabled={isActive || disabled}
                  className="pointer-events-auto flex flex-col items-center px-3 py-1.5 transition-all duration-200 group"
                >
                  <span
                    className={`text-xs mb-0.5 transition-all duration-200 ${
                      isActive ? 'text-neon-cyan' : 'text-gray-500 group-hover:text-gray-300'
                    }`}
                    style={isActive ? { textShadow: '0 0 8px #00f0ff' } : {}}
                  >
                    {zone.icon}
                  </span>
                  <span
                    className={`text-[9px] tracking-wider transition-all duration-200 ${
                      isActive ? 'text-neon-cyan' : 'text-gray-600 group-hover:text-gray-400'
                    }`}
                  >
                    {zone.label}
                  </span>
                  {isActive && (
                    <div className="w-4 h-0.5 bg-neon-cyan mt-1" style={{ boxShadow: '0 0 4px #00f0ff' }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
