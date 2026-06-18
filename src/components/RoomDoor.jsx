import { useState } from 'react';

function ProficiencyBar({ value, color }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>숙련도</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-2 bg-dark-surface overflow-hidden"
        style={{ clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 100%, 4px 100%)' }}
      >
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{ width: `${value}%`, backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    </div>
  );
}

export default function RoomDoor({ skill, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    setTimeout(() => {
      setShowModal(true);
    }, 600);
  };

  const handleClose = () => {
    setShowModal(false);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="relative cursor-pointer group perspective-[800px]"
        onClick={handleClick}
      >
        <div className="relative w-48 h-64 mx-auto">
          {/* Door frame */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              border: `2px solid ${skill.color}`,
              clipPath: 'polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))',
              boxShadow: isOpen
                ? `0 0 20px ${skill.color}, 0 0 40px ${skill.color}44, inset 0 0 20px ${skill.color}22`
                : `0 0 10px ${skill.color}44`,
            }}
          >
            {/* Door panel */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-dark-card to-dark-surface flex flex-col items-center justify-center gap-3 transition-transform duration-700 origin-left"
              style={{
                clipPath: 'polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))',
                transform: isOpen ? 'rotateY(-110deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Room number */}
              <div
                className="text-3xl font-bold opacity-80"
                style={{ color: skill.color, textShadow: `0 0 10px ${skill.color}` }}
              >
                {skill.room}
              </div>
              {/* Skill icon */}
              <div
                className="w-12 h-12 flex items-center justify-center text-sm font-bold"
                style={{
                  border: `2px solid ${skill.color}`,
                  color: skill.color,
                  boxShadow: `0 0 10px ${skill.color}44, inset 0 0 10px ${skill.color}22`,
                  clipPath: 'polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px))',
                }}
              >
                {skill.icon}
              </div>
              {/* Skill name */}
              <div className="text-gray-300 text-sm font-medium text-center px-2">
                {skill.name}
              </div>
              {/* Door handle */}
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-8 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{
                  backgroundColor: skill.color,
                  boxShadow: `0 0 8px ${skill.color}`,
                  clipPath: 'polygon(0 2px, 2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px))',
                }}
              />
            </div>
          </div>

          {/* Room interior */}
          <div
            className="absolute inset-0 bg-dark-bg transition-all duration-700 flex items-center justify-center overflow-hidden"
            style={{
              border: `2px solid ${skill.color}`,
              clipPath: 'polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            <div
              className="text-lg animate-pulse font-bold"
              style={{ color: skill.color, textShadow: `0 0 20px ${skill.color}` }}
            >
              {skill.room}
            </div>
            {/* Grid lines inside room */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />
          </div>
        </div>

        {/* Floor line */}
        <div className="w-full h-px mt-2 opacity-30" style={{ backgroundColor: skill.color, boxShadow: `0 0 4px ${skill.color}` }} />
      </div>

      {/* Skill detail modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="bg-dark-card p-8 max-w-md w-full mx-4 relative"
            style={{
              border: `2px solid ${skill.color}`,
              boxShadow: `0 0 30px ${skill.color}33, inset 0 0 30px ${skill.color}11`,
              clipPath: 'polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl transition-colors z-10"
            >
              ✕
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 flex items-center justify-center text-lg font-bold"
                  style={{
                    border: `2px solid ${skill.color}`,
                    color: skill.color,
                    boxShadow: `0 0 10px ${skill.color}44, inset 0 0 10px ${skill.color}22`,
                    clipPath: 'polygon(0 6px, 6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px))',
                  }}
                >
                  {skill.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-500" style={{ color: skill.color }}>
                    Room {skill.room}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{skill.name}</h2>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {skill.description}
              </p>

              <ProficiencyBar value={skill.proficiency} color={skill.color} />
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 pointer-events-none" style={{ borderColor: skill.color }} />
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 pointer-events-none" style={{ borderColor: skill.color }} />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 pointer-events-none" style={{ borderColor: skill.color }} />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 pointer-events-none" style={{ borderColor: skill.color }} />
          </div>
        </div>
      )}
    </>
  );
}
