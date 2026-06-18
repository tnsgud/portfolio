import { useNavigate, useLocation } from 'react-router-dom';

const floors = [
  { path: '/blog', label: '5F', name: '블로그' },
  { path: '/learning', label: '4F', name: '트레이닝' },
  { path: '/projects', label: '3F', name: '프로젝트' },
  { path: '/skills', label: '2F', name: '스킬' },
  { path: '/', label: '1F', name: '로비' },
];

export default function Elevator({ onFloorChange, disabled }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (onFloorChange) {
      onFloorChange(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40">
      <div
        className="bg-dark-card/90 backdrop-blur-sm rounded-sm p-3 flex flex-col items-center gap-2 shadow-[0_0_15px_#00f0ff22]"
        style={{
          clipPath: 'polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))',
          border: '1px solid rgba(0, 240, 255, 0.3)',
        }}
      >
        <div className="text-[10px] text-neon-cyan tracking-widest mb-1 animate-pulse-neon">ELEVATOR</div>
        <div
          className="w-9 h-10 flex items-center justify-center bg-black/80 mb-1"
          style={{
            border: '1px solid rgba(0, 240, 255, 0.4)',
            clipPath: 'polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px))',
          }}
        >
          <span className="text-neon-cyan font-bold text-sm">
            {floors.find((f) => f.path === location.pathname)?.label}
          </span>
        </div>
        <div className="w-px h-2 bg-neon-cyan/30" />
        <div className="flex flex-col gap-1.5">
          {floors.map((floor) => {
            const isCurrent = floor.path === location.pathname;
            return (
              <button
                key={floor.path}
                onClick={() => handleClick(floor.path)}
                disabled={isCurrent || disabled}
                className={`w-9 h-9 text-xs font-bold transition-all duration-300 ${
                  isCurrent
                    ? 'bg-neon-cyan/20 text-neon-cyan cursor-default'
                    : 'bg-dark-surface text-gray-400 hover:text-neon-cyan'
                } disabled:opacity-60 disabled:cursor-not-allowed`}
                style={{
                  border: `1px solid ${isCurrent ? '#00f0ff' : 'rgba(42, 42, 58, 1)'}`,
                  clipPath: 'polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px))',
                  boxShadow: isCurrent ? '0 0 10px #00f0ff44, inset 0 0 10px #00f0ff22' : 'none',
                }}
              >
                {floor.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col items-center text-[10px] text-neon-cyan/40 mt-1 gap-0">
          <span>▲</span>
          <span>▼</span>
        </div>
      </div>
    </div>
  );
}
