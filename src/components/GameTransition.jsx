import { useEffect, useState } from 'react';

export default function GameTransition({ isTransitioning, targetZone }) {
  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center space-y-6">
        {/* Spinning game-loader */}
        <div className="relative w-20 h-20 mx-auto">
          <div
            className="absolute inset-0 border-2 border-neon-cyan/30 animate-spin"
            style={{ clipPath: 'polygon(0 6px, 6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px))' }}
          />
          <div
            className="absolute inset-2 border border-neon-pink/40 animate-spin"
            style={{ clipPath: 'polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px))', animationDirection: 'reverse' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-neon-cyan text-lg font-bold">⚡</span>
          </div>
        </div>

        <div className="text-gray-500 text-xs tracking-[0.3em] animate-pulse">
          LOADING
        </div>

        <div className="flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-4 h-1 bg-neon-cyan/60"
              style={{
                animation: `pulse 0.6s ${i * 0.2}s infinite`,
                clipPath: 'polygon(0 0, calc(100% - 2px) 0, 100% 100%, 2px 100%)',
              }}
            />
          ))}
        </div>

        {targetZone && (
          <div className="text-[10px] text-gray-700 tracking-widest">
            ZONE {targetZone}
          </div>
        )}
      </div>
    </div>
  );
}
