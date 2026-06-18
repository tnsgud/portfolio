import { motion } from 'framer-motion';
import GameHUD from '../components/GameHUD';
import NeonSign from '../components/NeonSign';
import ScanLines from '../components/ScanLines';

const posts = [
  {
    title: 'React 19 새로운 기능 훑어보기',
    desc: 'React 19에서 도입된 액션, 폼 훅, 그리고 동시성 모드의 변화를 정리했습니다.',
    date: '2025.12',
    tag: 'FRONTEND',
    color: '#00f0ff',
    slug: 'react-19-new-features',
  },
  {
    title: 'TypeScript 5.x 타입 시스템 딥다이브',
    desc: '조건부 타입, 템플릿 리터럴, mapped type의 고급 활용법을 알아봅니다.',
    date: '2025.11',
    tag: 'TYPESCRIPT',
    color: '#3178c6',
    slug: 'typescript-5-deep-dive',
  },
  {
    title: 'Next.js 앱 라우터 완벽 가이드',
    desc: 'App Router의 서버 컴포넌트, 라우팅, 데이터 페칭 패턴을 총정리.',
    date: '2025.10',
    tag: 'NEXTJS',
    color: '#ff00ff',
    slug: 'nextjs-app-router-guide',
  },
  {
    title: 'Flutter로 크로스플랫폼 앱 개발하기',
    desc: 'Flutter 프레임워크를 활용한 iOS/Android 앱 개발 경험 공유.',
    date: '2025.09',
    tag: 'MOBILE',
    color: '#39ff14',
    slug: 'flutter-crossplatform-dev',
  },
  {
    title: 'Supabase로 백엔드 없이 앱 만들기',
    desc: 'Supabase를 활용한 인증, 데이터베이스, 스토리지 구현 방법 소개.',
    date: '2025.08',
    tag: 'BACKEND',
    color: '#ffee00',
    slug: 'supabase-backendless-app',
  },
  {
    title: '우당탕탕 취업 성공기',
    desc: '신입 개발자로 취업하기까지의 과정을 기록한 회고록.',
    date: '2025.07',
    tag: 'LIFE',
    color: '#ff6600',
    slug: 'job-hunting-retrospective',
  },
];

export default function Codex({ onFloorChange, disabled }) {
  return (
    <div className="relative min-h-screen bg-dark-bg overflow-y-auto overflow-x-hidden">
      <ScanLines />

      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 238, 0, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 238, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="fixed top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-neon-yellow/20 pointer-events-none" />
      <div className="fixed top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-neon-yellow/20 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-neon-yellow/20 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-neon-yellow/20 pointer-events-none" />

      <div className="fixed top-1/4 left-1/3 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <GameHUD onZoneChange={onFloorChange} disabled={disabled} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-20 pb-24">
        <div className="text-center mb-10">
          <NeonSign text="◆ COBA-LOG" color="#ffee00" flicker />
          <p className="text-xs text-gray-600 mt-2 tracking-widest">개발 블로그 — 코딩밖에 모르는 바보의 이야기</p>
        </div>

        <div className="space-y-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group relative bg-dark-card/60 backdrop-blur p-5 transition-all duration-300 hover:bg-dark-card/80"
              style={{
                border: `1px solid ${post.color}22`,
                clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = post.color;
                e.currentTarget.style.boxShadow = `0 0 20px ${post.color}22`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${post.color}22`;
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[9px] px-1.5 py-0.5 tracking-wider"
                      style={{
                        color: post.color,
                        border: `1px solid ${post.color}33`,
                        clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 100%, 0 100%)',
                      }}
                    >
                      {post.tag}
                    </span>
                    <span className="text-[9px] text-gray-700">{post.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-neon-cyan transition-colors truncate">
                    {post.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed line-clamp-1">
                    {post.desc}
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-gray-700 group-hover:text-neon-cyan transition-colors text-xs">{'>'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
