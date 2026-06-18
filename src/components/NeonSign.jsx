import { useRef, useEffect } from 'react';

export default function NeonSign({ text, color = '#00f0ff', className = '', flicker = false }) {
  return (
    <span
      className={`${className} ${flicker ? 'animate-flicker' : ''} relative inline-block`}
      style={{
        color,
        textShadow: `0 0 4px ${color}, 0 0 11px ${color}, 0 0 19px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
      }}
    >
      {text}
    </span>
  );
}
