import { motion } from 'framer-motion';
import GameHUD from '../components/GameHUD';
import NeonSign from '../components/NeonSign';
import ScanLines from '../components/ScanLines';

const trainings = [
  {
    title: '알고리즘',
    desc: '자료구조, 정렬, 탐색, DP, 그래프 이론까지. 매일 1문제씩 풀며 실전 감각 유지.',
    stat: 'SOLVED',
    value: '350+',
    color: '#ff00ff',
    icon: '⚔',
  },
  {
    title: '시스템 디자인',
    desc: '대규모 분산 시스템 설계를 위한 패턴 학습. 트래픽, 확장성, 장애 대응 전략.',
    stat: 'PATTERNS',
    value: '24',
    color: '#00f0ff',
    icon: '⚙',
  },
  {
    title: 'CS 기초',
    desc: '운영체제, 네트워크, 데이터베이스 이론 복습 및 면접 대비.',
    stat: 'TOPICS',
    value: '18',
    color: '#39ff14',
    icon: '◆',
  },
  {
    title: '클린 코드',
    desc: '리팩토링, 디자인 패턴, 테스트 코드 작성. 유지보수 가능한 코드를 위한 훈련.',
    stat: 'REFACTOR',
    value: '12',
    color: '#ffee00',
    icon: '◈',
  },
  {
    title: '데브옵스',
    desc: 'CI/CD, Docker, AWS 인프라 관리 및 모니터링. 배포 자동화 파이프라인 구축.',
    stat: 'PIPELINES',
    value: '6',
    color: '#ff6600',
    icon: '▲',
  },
  {
    title: '영어',
    desc: '기술 문서 읽기, 해외 컨퍼런스 시청, 영문 이슈 트래킹. 글로벌 개발자로 성장.',
    stat: 'STREAK',
    value: '200d',
    color: '#b300ff',
    icon: '★',
  },
];

export default function TrainingMode({ onFloorChange, disabled }) {
  return (
    <div className="relative min-h-screen bg-dark-bg overflow-y-auto overflow-x-hidden">
      <ScanLines />

      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(57, 255, 20, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57, 255, 20, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="fixed top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-neon-green/20 pointer-events-none" />
      <div className="fixed top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-neon-green/20 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-neon-green/20 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-neon-green/20 pointer-events-none" />

      <div className="fixed top-1/3 left-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      <GameHUD onZoneChange={onFloorChange} disabled={disabled} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-24">
        <div className="text-center mb-10">
          <NeonSign text="▲ TRAINING MODE" color="#39ff14" />
          <p className="text-xs text-gray-600 mt-2 tracking-widest">훈련 현황</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainings.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group relative bg-dark-card/60 backdrop-blur p-5 transition-all duration-300 hover:bg-dark-card/80"
              style={{
                border: `1px solid ${t.color}22`,
                clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = t.color;
                e.currentTarget.style.boxShadow = `0 0 24px ${t.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${t.color}22`;
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* Corner hex */}
              <div className="absolute top-0 right-0 w-5 h-5 border-r border-t" style={{ borderColor: `${t.color}33` }} />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-l border-b" style={{ borderColor: `${t.color}33` }} />

              {/* Icon + Title */}
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: t.color }} className="text-lg">{t.icon}</span>
                <h3 className="text-base font-bold text-white">{t.title}</h3>
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
                {t.desc}
              </p>

              {/* Stat box */}
              <div
                className="flex items-center justify-between px-3 py-2"
                style={{
                  backgroundColor: `${t.color}08`,
                  border: `1px solid ${t.color}15`,
                  clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 100%, 0 100%)',
                }}
              >
                <span className="text-[9px] text-gray-600 tracking-wider">{t.stat}</span>
                <span className="text-sm font-bold" style={{ color: t.color, textShadow: `0 0 12px ${t.color}44` }}>
                  {t.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
