import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameHUD from "../components/GameHUD";
import NeonSign from "../components/NeonSign";
import ScanLines from "../components/ScanLines";
import useKeydown from "../hooks/useKeydown";

const projects = [
  {
    id: 1,
    title: "Tumtum",
    description:
      "음악 공유 SNS 플랫폼. 사용자 간 음악 추천 및 플레이리스트 공유 기능을 제공하는 웹 애플리케이션.",
    tech: ["React", "TypeScript", "Supabase"],
    repo: "https://github.com/tnsgud/tumtum",
    difficulty: "A",
    color: "#ff00ff",
  },
  {
    id: 2,
    title: "KIM YEONG SEOK",
    description: "겨냥대 박는 김영석의 이야기",
    tech: ["Phaser"],
    repo: "https://github.com/tnsgud/kim-young-seok-king-of-the-aiming-posts",
    difficulty: "B",
    color: "#ff00ff",
  },
  {
    id: 3,
    title: "Mura",
    description: "Mura 프로젝트. 웹 기반 애플리케이션.",
    tech: ["React", "TypeScript"],
    repo: "https://github.com/tnsgud/mura",
    difficulty: "B",
    color: "#00f0ff",
  },
  {
    id: 4,
    title: "Coba-log",
    description:
      "개발 블로그 플랫폼. 기술 블로그를 쉽게 운영할 수 있도록 만든 프로젝트.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    repo: "https://github.com/tnsgud/coba-log",
    difficulty: "B",
    color: "#ffee00",
  },
  {
    id: 5,
    title: "Carrot Market",
    description:
      "당근마켓 클론 코딩. 중고 거래 플랫폼의 핵심 기능을 구현한 프로젝트.",
    tech: ["React", "TypeScript", "Supabase"],
    repo: "https://github.com/tnsgud/carrot-market",
    difficulty: "A",
    color: "#ff00ff",
  },
  {
    id: 6,
    title: "Droni Frontend",
    description: "드로니 프론트엔드. 드론 관련 서비스 웹 애플리케이션.",
    tech: ["Flutter"],
    repo: "https://github.com/tnsgud/droni-frontend",
    difficulty: "S",
    color: "#00f0ff",
  },
  {
    id: 7,
    title: "TikTok Clone",
    description:
      "틱톡 클론 코딩. 숏폼 동영상 플랫폼의 핵심 기능을 구현한 프로젝트.",
    tech: ["Flutter", "Firebase"],
    repo: "https://github.com/tnsgud/tiktok-clone-native",
    difficulty: "A",
    color: "#ff00ff",
  },
  {
    id: 8,
    title: "UberEats Backend",
    description:
      "우버이츠 클론 백엔드. 배달 음식 플랫폼의 서버 사이드를 구현한 프로젝트.",
    tech: ["NestJS", "TypeScript", "PostgreSQL", "GraphQL"],
    repo: "https://github.com/tnsgud/uber-eats-back",
    difficulty: "S",
    color: "#39ff14",
  },
];

const difficultyColors = {
  S: "#39ff14",
  A: "#ff00ff",
  B: "#00f0ff",
  C: "#ffee00",
};

export default function MissionLog({ onFloorChange, disabled }) {
  const [selected, setSelected] = useState(null);

  useKeydown({ Escape: () => setSelected(null) }, selected !== null);

  return (
    <div className="relative min-h-screen bg-dark-bg overflow-y-auto overflow-x-hidden">
      <ScanLines />

      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="fixed top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-neon-cyan/20 pointer-events-none" />
      <div className="fixed top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-neon-cyan/20 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-neon-cyan/20 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-neon-cyan/20 pointer-events-none" />

      <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <GameHUD onZoneChange={onFloorChange} disabled={disabled} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-24">
        <div className="text-center mb-10">
          <NeonSign text="★ MISSION COMPLETE" color="#00f0ff" />
          <p className="text-xs text-gray-600 mt-2 tracking-widest">
            완료된 프로젝트 아카이브
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelected(proj)}
              className="group relative bg-dark-card/60 backdrop-blur p-5 cursor-pointer transition-all duration-300 hover:bg-dark-card/80"
              style={{
                border: `1px solid ${proj.color}22`,
                clipPath:
                  "polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = proj.color;
                e.currentTarget.style.boxShadow = `0 0 24px ${proj.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${proj.color}22`;
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* Difficulty badge */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-bold text-white">{proj.title}</h3>
                <span
                  className="text-[10px] font-bold px-2 py-0.5"
                  style={{
                    color: proj.color,
                    border: `1px solid ${proj.color}44`,
                    clipPath:
                      "polygon(3px 0, calc(100% - 3px) 0, 100% 100%, 0 100%)",
                  }}
                >
                  RANK {proj.difficulty}
                </span>
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed mb-3 line-clamp-2">
                {proj.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] px-2 py-0.5 text-gray-600"
                    style={{
                      border: "1px solid rgba(255,255,255,0.06)",
                      clipPath:
                        "polygon(2px 0, calc(100% - 2px) 0, 100% 100%, 0 100%)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* View prompt */}
              <div className="flex items-center gap-1 text-[10px] text-gray-700 group-hover:text-neon-cyan transition-colors">
                <span>▶</span>
                <span>MISSION DATA</span>
              </div>

              {/* Corner decals */}
              <div
                className="absolute top-0 right-0 w-5 h-5 border-r border-t"
                style={{ borderColor: `${proj.color}22` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission detail modal */}
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
                clipPath:
                  "polygon(14px 0, calc(100% - 14px) 0, 100% 100%, 0 100%)",
              }}
            >
              {/* Decorative corners */}
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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">
                    {selected.title}
                  </h2>
                  <span className="text-xs text-gray-600">
                    RANK {selected.difficulty}
                  </span>
                </div>

                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  {selected.description}
                </p>

                <div className="mb-6">
                  <p className="text-[10px] text-gray-600 tracking-widest mb-2">
                    // MISSION DATA
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 text-gray-500 bg-dark-surface"
                        style={{
                          clipPath:
                            "polygon(3px 0, calc(100% - 3px) 0, 100% 100%, 0 100%)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={selected.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-neon-cyan hover:text-white transition-colors"
                  style={{ textShadow: "0 0 8px rgba(0,240,255,0.3)" }}
                >
                  ▶ 깃허브에서 보기 →
                </a>
              </div>

              {/* Close */}
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
