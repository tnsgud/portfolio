import { useEffect, useState } from 'react';

export default function ElevatorTransition({ isTransitioning, targetFloor }) {
  const show = isTransitioning;

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-neon-cyan rounded-full mx-auto animate-ping opacity-75" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-neon-cyan text-3xl font-bold">{targetFloor}</span>
          </div>
        </div>
        <div className="text-gray-500 text-sm tracking-widest animate-pulse">
          FLOOR CHANGING
        </div>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-neon-cyan/50 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
