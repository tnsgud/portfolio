import { motion } from 'framer-motion';
import GameHUD from '../components/GameHUD';
import NeonSign from '../components/NeonSign';
import ScanLines from '../components/ScanLines';
import { skills } from '../data/skills';

const skillTypes = {
  React: 'frontend',
  TypeScript: 'language',
  'Next.js': 'frontend',
  'Tailwind CSS': 'frontend',
  Flutter: 'mobile',
  Supabase: 'backend',
  'Java (Android)': 'mobile',
  Python: 'language',
  MySQL: 'database',
};

const typeColors = {
  frontend: { border: '#ff00ff', glow: 'rgba(255,0,255,0.3)', bg: 'rgba(255,0,255,0.04)' },
  backend: { border: '#00f0ff', glow: 'rgba(0,240,255,0.3)', bg: 'rgba(0,240,255,0.04)' },
  mobile: { border: '#39ff14', glow: 'rgba(57,255,20,0.3)', bg: 'rgba(57,255,20,0.04)' },
  database: { border: '#ffee00', glow: 'rgba(255,238,0,0.3)', bg: 'rgba(255,238,0,0.04)' },
  language: { border: '#b300ff', glow: 'rgba(179,0,255,0.3)', bg: 'rgba(179,0,255,0.04)' },
};

const typeIcons = {
  frontend: '◈',
  backend: '◈',
  mobile: '◈',
  database: '◈',
  language: '◈',
};

const getSkillType = (skill) => skillTypes[skill.name] || 'frontend';

export default function SkillTree({ onFloorChange, disabled }) {
  return (
    <div className="relative min-h-screen bg-dark-bg overflow-y-auto overflow-x-hidden">
      <ScanLines />

      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="fixed top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-neon-pink/20 pointer-events-none" />
      <div className="fixed top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-neon-pink/20 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-neon-pink/20 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-neon-pink/20 pointer-events-none" />

      <div className="fixed top-1/3 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/3 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <GameHUD onZoneChange={onFloorChange} disabled={disabled} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-24">
        <div className="text-center mb-10">
          <NeonSign text="⚡ ABILITY GRID" color="#ff00ff" flicker />
          <p className="text-xs text-gray-600 mt-2 tracking-widest">능력치 트리</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, i) => {
            const colors = typeColors[getSkillType(skill)] || typeColors.frontend;
            const icon = typeIcons[getSkillType(skill)] || '◈';
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-dark-card/60 backdrop-blur p-5 transition-all duration-300 hover:bg-dark-card/80"
                style={{
                  border: `1px solid ${colors.border}22`,
                  clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.boxShadow = `0 0 24px ${colors.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${colors.border}22`;
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {/* Corner decal */}
                <div className="absolute top-0 right-0 w-6 h-6" style={{ borderRight: `2px solid ${colors.border}33`, borderTop: `2px solid ${colors.border}33` }} />
                <div className="absolute bottom-0 left-0 w-6 h-6" style={{ borderLeft: `2px solid ${colors.border}33`, borderBottom: `2px solid ${colors.border}33` }} />

                {/* Type badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-600 tracking-wider">{getSkillType(skill).toUpperCase()}</span>
                  <span style={{ color: colors.border }} className="text-xs">{icon}</span>
                </div>

                {/* Skill name */}
                <h3 className="text-base font-bold text-white mb-1">{skill.name}</h3>
                <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">{skill.description}</p>

                {/* XP bar for proficiency */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-600">PROFICIENCY</span>
                    <span style={{ color: colors.border }}>{skill.proficiency}%</span>
                  </div>
                  <div
                    className="h-2 bg-dark-surface overflow-hidden"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 3px) 0, 100% 100%, 3px 100%)' }}
                  >
                    <div
                      className="h-full transition-all duration-1000"
                      style={{
                        width: `${skill.proficiency}%`,
                        backgroundColor: colors.border,
                        boxShadow: `0 0 8px ${colors.glow}`,
                      }}
                    />
                  </div>
                </div>

                {/* Projects completed count as "KILLS" */}
                <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-600">
                  <span>▶</span>
                  <span>완료: {Math.floor(skill.proficiency / 20) + 1} missions</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
