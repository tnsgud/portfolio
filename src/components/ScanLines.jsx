export default function ScanLines() {
  return (
    <>
      {/* Scan line overlay */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)',
        }}
      />
      {/* Moving scan line */}
      <div
        className="fixed left-0 right-0 h-px z-[60] pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
          animation: 'scan-line 4s linear infinite',
        }}
      />
    </>
  );
}
