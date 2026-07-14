import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameHUD from '../components/GameHUD';
import NeonSign from '../components/NeonSign';
import ScanLines from '../components/ScanLines';
import useKeydown from '../hooks/useKeydown';

const posts = [
  {
    title: 'React 19 새로운 기능 훑어보기',
    desc: 'React 19에서 도입된 액션, 폼 훅, 그리고 동시성 모드의 변화를 정리했습니다.',
    date: '2025.12',
    tag: 'FRONTEND',
    color: '#00f0ff',
    slug: 'react-19-new-features',
    content: 'React 19는 사용자 경험과 개발자 경험을 모두 향상시키는 중요한 업데이트입니다. 이 글에서는 새롭게 도입된 Actions, 폴백 상태 관리를 간소화하는 useActionState, 폼 데이터를 쉽게 처리할 수 있는 useFormStatus, 그리고 Optimistic Updates를 위한 useOptimistic 훅을 살펴봅니다. 또한 Suspense의 개선과 함께 동시성 렌더링이 애플리케이션 성능에 어떤 영향을 미치는지 실제 예제와 함께 분석합니다.',
  },
  {
    title: 'TypeScript 5.x 타입 시스템 딥다이브',
    desc: '조건부 타입, 템플릿 리터럴, mapped type의 고급 활용법을 알아봅니다.',
    date: '2025.11',
    tag: 'TYPESCRIPT',
    color: '#3178c6',
    slug: 'typescript-5-deep-dive',
    content: 'TypeScript 5.x에서는 타입 시스템이 더욱 강력하고 표현력 있게 발전했습니다. 조건부 타입을 활용한 API 응답 타입 추론, 템플릿 리터럴 타입으로 URL 파라미터 검증, mapped type을 통한 UI 상태 관리 등 실무에서 바로 적용 가능한 고급 패턴을 소개합니다. 특히 satisfies 연산자와 const 타입 매개변수를 활용한 정밀한 타입 추론 전략을 중점적으로 다룹니다.',
  },
  {
    title: 'Next.js 앱 라우터 완벽 가이드',
    desc: 'App Router의 서버 컴포넌트, 라우팅, 데이터 페칭 패턴을 총정리.',
    date: '2025.10',
    tag: 'NEXTJS',
    color: '#ff00ff',
    slug: 'nextjs-app-router-guide',
    content: 'Next.js App Router는 리액트 서버 컴포넌트를 기반으로 한 새로운 패러다임을 제시합니다. 파일 기반 라우팅의 세부 규칙부터 서버/클라이언트 컴포넌트의 경계 설정, Streaming SSR과 Suspense를 활용한 점진적 페이지 로드, 서버 액션을 통한 폼 처리까지 실제 프로젝트에서 마주치는 다양한 상황별 구현 패턴을 정리했습니다.',
  },
  {
    title: 'Flutter로 크로스플랫폼 앱 개발하기',
    desc: 'Flutter 프레임워크를 활용한 iOS/Android 앱 개발 경험 공유.',
    date: '2025.09',
    tag: 'MOBILE',
    color: '#39ff14',
    slug: 'flutter-crossplatform-dev',
    content: 'Flutter는 단일 코드베이스로 네이티브 수준의 성능을 제공하는 크로스플랫폼 프레임워크입니다. Widget 트리 구조와 BuildContext의 이해부터 Riverpod을 활용한 상태 관리, REST API 연동, 플랫폼 채널을 통한 네이티브 기능 확장까지 실제 앱 출시 과정에서 겪은 트러블슈팅 경험을 공유합니다.',
  },
  {
    title: 'Supabase로 백엔드 없이 앱 만들기',
    desc: 'Supabase를 활용한 인증, 데이터베이스, 스토리지 구현 방법 소개.',
    date: '2025.08',
    tag: 'BACKEND',
    color: '#ffee00',
    slug: 'supabase-backendless-app',
    content: 'Supabase는 오픈소스 Firebase 대안으로, PostgreSQL 기반의 백엔드 서비스를 제공합니다. Row Level Security를 활용한 데이터 접근 제어, 실시간 구독 기능으로 채팅 구현, Supabase Storage를 이용한 파일 업로드/관리, 그리고 Edge Functions로 서버 로직까지 커버하는 엔드투엔드 개발 경험을 다룹니다.',
  },
  {
    title: '우당탕탕 취업 성공기',
    desc: '신입 개발자로 취업하기까지의 과정을 기록한 회고록.',
    date: '2025.07',
    tag: 'LIFE',
    color: '#ff6600',
    slug: 'job-hunting-retrospective',
    content: '비전공자에서 개발자로 전향하여 취업에 성공하기까지의 여정을 담은 회고록입니다. 부트캠프 수강부터 포트폴리오 준비, 기술 면접과 코딩 테스트 대비 전략, 그리고 실제 면접에서 받았던 질문들과 그에 대한 접근 방식까지 생생한 경험을 공유합니다. 취업 준비생들에게 실질적인 도움이 될 수 있는 인사이트를 제공합니다.',
  },
];

export default function Codex({ onFloorChange, disabled }) {
  const [selected, setSelected] = useState(null);

  useKeydown({ Escape: () => setSelected(null) }, selected !== null);

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
              onClick={() => setSelected(post)}
              className="group relative bg-dark-card/60 backdrop-blur p-5 cursor-pointer transition-all duration-300 hover:bg-dark-card/80"
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

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-dark-card p-6"
              style={{
                border: `1px solid ${selected.color}44`,
                clipPath: 'polygon(14px 0, calc(100% - 14px) 0, 100% 100%, 0 100%)',
              }}
            >
              <div
                className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2"
                style={{ borderColor: selected.color }}
              />
              <div
                className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2"
                style={{ borderColor: selected.color }}
              />
              <div
                className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2"
                style={{ borderColor: selected.color }}
              />
              <div
                className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2"
                style={{ borderColor: selected.color }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">{selected.title}</h2>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[9px] px-1.5 py-0.5 tracking-wider"
                        style={{
                          color: selected.color,
                          border: `1px solid ${selected.color}33`,
                          clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 100%, 0 100%)',
                        }}
                      >
                        {selected.tag}
                      </span>
                      <span className="text-[10px] text-gray-600">{selected.date}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-[10px] text-gray-600 tracking-widest mb-2">// POST</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{selected.content}</p>
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-white text-xs"
              >
                ESC
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
