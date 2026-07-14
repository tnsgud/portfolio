# 키보드 반응 기능 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 게임 컨셉 포트폴리오에 ESC 모달 닫기와 Lobby 방향키 메뉴 탐색을 추가한다.

**Architecture:** 공용 `useKeydown` 훅 하나를 만들고(키 이름 → 핸들러 맵, `enabled` 옵션), Projects/BlogFloor 모달의 ESC 닫기와 Lobby의 ↑/↓/Enter 메뉴 탐색 세 곳에서 재사용한다.

**Tech Stack:** React 19, Vite, Tailwind CSS, Framer Motion (JavaScript, `.jsx` — TypeScript 아님)

**Spec:** `docs/superpowers/specs/2026-07-14-keyboard-navigation-design.md`

## Global Constraints

- 이 프로젝트에는 테스트 러너가 없다. 검증은 스펙 지정대로 dev 서버 브라우저 수동 확인으로 한다 (`npm run dev`, 현재 http://localhost:5174 에 실행 중).
- 핸들러가 처리한 키는 `event.preventDefault()`로 기본 동작(스크롤 등)을 막는다.
- 기존 UI 표시는 유지한다: 모달의 "ESC" 버튼은 그대로 두고 키 동작만 연결. Lobby 하단 "SELECT ZONE" 문구만 `↑↓ SELECT  ⏎ CONFIRM`으로 교체.
- 커밋 메시지는 기존 저장소 관례(한국어 짧은 제목)를 따른다.

---

### Task 1: `useKeydown` 훅 생성 + Projects 모달 ESC 닫기

**Files:**
- Create: `src/hooks/useKeydown.js`
- Modify: `src/pages/Projects.jsx` (import 블록, `MissionLog` 컴포넌트 상단)

**Interfaces:**
- Produces: `useKeydown(handlers, enabled = true)` — default export.
  - `handlers`: `{ [event.key]: (event) => void }` 형태의 객체 (예: `{ Escape: fn, ArrowUp: fn }`)
  - `enabled`: boolean. `false`면 리스너를 등록하지 않음. 기본값 `true`.
  - 반환값 없음. `window`에 `keydown` 리스너를 등록하고 언마운트/`enabled` 변경 시 정리.

- [ ] **Step 1: 훅 작성**

`src/hooks/useKeydown.js` 생성:

```js
import { useEffect, useRef } from 'react';

export default function useKeydown(handlers, enabled = true) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event) => {
      const handler = handlersRef.current[event.key];
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled]);
}
```

`handlersRef` 패턴을 쓰는 이유: 매 렌더마다 최신 핸들러(최신 state 클로저)를 참조하면서도 리스너 등록/해제는 `enabled` 변경 시에만 일어나게 한다.

- [ ] **Step 2: Projects 모달에 ESC 연결**

`src/pages/Projects.jsx` 상단 import에 추가:

```js
import useKeydown from '../hooks/useKeydown';
```

`MissionLog` 컴포넌트의 `const [selected, setSelected] = useState(null);` 바로 아래에 추가:

```js
useKeydown({ Escape: () => setSelected(null) }, selected !== null);
```

- [ ] **Step 3: 브라우저 검증**

dev 서버(localhost:5174)에서 확인:
1. MISSIONS 존으로 이동 → 아무 프로젝트 카드 클릭 → 모달 열림
2. ESC 키 입력 → 모달 닫힘 (기대 결과)
3. 모달이 닫힌 상태에서 ESC 입력 → 아무 일 없음, 콘솔 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/hooks/useKeydown.js src/pages/Projects.jsx
git commit -m "useKeydown 훅 추가 및 프로젝트 모달 ESC 닫기 연결"
```

---

### Task 2: BlogFloor 모달 ESC 닫기

**Files:**
- Modify: `src/pages/BlogFloor.jsx` (import 블록, `Codex` 컴포넌트 상단)

**Interfaces:**
- Consumes: `useKeydown(handlers, enabled)` — Task 1의 default export (`src/hooks/useKeydown.js`)

- [ ] **Step 1: BlogFloor 모달에 ESC 연결**

`src/pages/BlogFloor.jsx` 상단 import에 추가:

```js
import useKeydown from '../hooks/useKeydown';
```

`Codex` 컴포넌트의 `const [selected, setSelected] = useState(null);` 바로 아래에 추가:

```js
useKeydown({ Escape: () => setSelected(null) }, selected !== null);
```

- [ ] **Step 2: 브라우저 검증**

dev 서버에서 확인:
1. CODEX 존으로 이동 → 아무 글 클릭 → 모달 열림
2. ESC 키 입력 → 모달 닫힘 (기대 결과)

- [ ] **Step 3: 커밋**

```bash
git add src/pages/BlogFloor.jsx
git commit -m "블로그 모달 ESC 닫기 연결"
```

---

### Task 3: Lobby 방향키 메뉴 탐색

**Files:**
- Modify: `src/pages/Lobby.jsx`

**Interfaces:**
- Consumes: `useKeydown(handlers, enabled)` — Task 1의 default export

- [ ] **Step 1: 메뉴 배열 호이스팅 + 선택 상태 + 키 핸들러 추가**

`src/pages/Lobby.jsx` 상단 import에 추가:

```js
import useKeydown from '../hooks/useKeydown';
```

컴포넌트 밖(파일 상단, import 아래)에 메뉴 배열을 호이스팅한다 — 현재 JSX 안에 인라인으로 있는 배열을 그대로 옮긴다:

```js
const MENU_ITEMS = [
  { path: '/skills', label: '⚡ SKILLS', desc: '능력치 보기' },
  { path: '/projects', label: '★ MISSIONS', desc: '프로젝트 기록' },
  { path: '/learning', label: '▲ TRAINING', desc: '학습 현황' },
  { path: '/blog', label: '◆ CODEX', desc: '개발 블로그' },
];
```

`MainMenu` 컴포넌트의 `const [showContact, setShowContact] = useState(false);` 아래에 추가:

```js
const [selectedIndex, setSelectedIndex] = useState(0);

useKeydown(
  {
    ArrowUp: () =>
      setSelectedIndex((i) => (i + MENU_ITEMS.length - 1) % MENU_ITEMS.length),
    ArrowDown: () => setSelectedIndex((i) => (i + 1) % MENU_ITEMS.length),
    Enter: () => onFloorChange?.(MENU_ITEMS[selectedIndex].path),
  },
  !disabled
);
```

- [ ] **Step 2: 버튼 렌더링에 선택 강조 + hover 동기화 적용**

기존 메뉴 버튼 `map` 블록(인라인 배열 `.map((item) => ...)`)을 아래로 교체한다:

```jsx
{MENU_ITEMS.map((item, i) => {
  const isSelected = i === selectedIndex;
  return (
    <button
      key={item.path}
      onClick={() => onFloorChange?.(item.path)}
      onMouseEnter={() => setSelectedIndex(i)}
      disabled={disabled}
      className={`group relative w-64 py-2.5 text-left px-5 transition-all duration-300 ${
        isSelected ? 'bg-dark-card/80' : 'bg-dark-card/50'
      }`}
      style={{
        border: `1px solid ${
          isSelected ? 'rgba(0, 240, 255, 0.5)' : 'rgba(0, 240, 255, 0.1)'
        }`,
        boxShadow: isSelected ? '0 0 20px rgba(0, 240, 255, 0.15)' : 'none',
        clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%)',
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <span
            className={`text-sm transition-colors ${
              isSelected ? 'text-white' : 'text-neon-cyan'
            }`}
          >
            {item.label}
          </span>
          <p className="text-[10px] text-gray-600 mt-0.5">{item.desc}</p>
        </div>
        <span
          className={`transition-colors text-xs ${
            isSelected ? 'text-neon-cyan' : 'text-gray-700'
          }`}
        >
          {'>'}
        </span>
      </div>
    </button>
  );
})}
```

참고: 기존 hover CSS 클래스(`hover:bg-dark-card/80`, `group-hover:*`) 대신 `onMouseEnter` → `setSelectedIndex(i)` 동기화로 hover 강조를 대체한다. hover하면 그 항목이 선택되므로 시각 효과가 동일하게 유지되고, 키보드/마우스 선택이 충돌하지 않는다. 기존 버튼 안의 하단 밑줄 장식 `div`(자체 `onMouseEnter/Leave`가 달려 있던 것)는 선택 강조(border+boxShadow)로 대체되므로 제거한다.

- [ ] **Step 3: 하단 힌트 문구 교체**

기존:

```jsx
<div className="absolute bottom-24 text-[10px] text-gray-800 tracking-[0.4em] animate-pulse">
  SELECT ZONE
</div>
```

교체:

```jsx
<div className="absolute bottom-24 text-[10px] text-gray-800 tracking-[0.4em] animate-pulse">
  ↑↓ SELECT&nbsp;&nbsp;⏎ CONFIRM
</div>
```

- [ ] **Step 4: 브라우저 검증**

dev 서버에서 TITLE 화면 확인:
1. 첫 진입 시 ⚡ SKILLS가 강조되어 있음 (기대 결과)
2. `↓` 3번 → ◆ CODEX 강조, 한 번 더 `↓` → ⚡ SKILLS로 순환 (기대 결과)
3. `↑` → ◆ CODEX로 역방향 순환 (기대 결과)
4. `↓`로 ★ MISSIONS 선택 후 `Enter` → 전환 연출과 함께 MISSIONS 존 진입 (기대 결과)
5. TITLE로 복귀 → 마우스를 ▲ TRAINING에 올림 → 강조가 TRAINING으로 이동, 이어서 `↓` → ◆ CODEX 강조 (hover 동기화 확인)
6. 전환 애니메이션 중 `Enter` 연타 → 중복 전환 없음 (기대 결과 — `disabled`로 차단)
7. 하단 문구가 `↑↓ SELECT  ⏎ CONFIRM`으로 표시됨

- [ ] **Step 5: 커밋**

```bash
git add src/pages/Lobby.jsx
git commit -m "Lobby 방향키 메뉴 탐색 및 Enter 진입 추가"
```
