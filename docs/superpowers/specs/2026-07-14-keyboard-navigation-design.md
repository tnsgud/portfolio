# 키보드 반응 기능 설계

날짜: 2026-07-14
상태: 승인됨

## 목표

게임 컨셉 포트폴리오에 키보드 입력 지원을 추가한다.

1. **ESC로 모달 닫기** — Projects, BlogFloor의 상세 모달
2. **Lobby 방향키 메뉴 탐색** — ↑/↓로 메뉴 선택, Enter로 존 진입

## 구현 방식

### 공용 훅: `src/hooks/useKeydown.js`

- 키 이름 → 핸들러 맵(예: `{ Escape: fn, ArrowUp: fn }`)을 받아 `window`에 `keydown` 리스너를 등록한다.
- 언마운트 시 리스너를 정리한다.
- `enabled` 옵션(기본 `true`)이 `false`면 리스너를 등록하지 않는다.
- 핸들러가 처리한 키는 `event.preventDefault()`로 기본 스크롤 동작을 막는다.

### Lobby (`src/pages/Lobby.jsx`)

- `selectedIndex` 상태(초기값 `0` — 첫 번째 메뉴 ⚡ SKILLS 선택 상태로 시작).
- `↑`/`↓`: 인덱스 이동, 끝에서 반대쪽으로 순환(wrap-around).
- `Enter`: `onFloorChange(menu[selectedIndex].path)` 호출. `disabled`(전환 중)일 때는 무시.
- 선택된 버튼은 기존 hover와 동일한 네온 강조 스타일 표시.
- 마우스 hover 시 `selectedIndex`를 해당 항목으로 동기화해 두 입력이 충돌하지 않게 한다.
- 하단 "SELECT ZONE" 문구를 `↑↓ SELECT  ⏎ CONFIRM` 힌트로 교체.

### 모달 ESC (`src/pages/Projects.jsx`, `src/pages/BlogFloor.jsx`)

- 모달이 열려 있을 때(`selected != null`) ESC 입력 시 `setSelected(null)`.
- `useKeydown`의 `enabled`에 `selected != null`을 전달한다.
- 기존 "ESC" 버튼 UI는 그대로 두고 실제 키 동작만 연결한다.

## 범위 제외 (추후 후보)

- 숫자키(1~4) 전역 존 이동
- Projects/Blog 카드 목록 방향키 탐색

## 테스트 / 검증

- 개발 서버에서 직접 확인: Lobby에서 방향키 순환·Enter 진입·hover 동기화, 각 모달에서 ESC 닫기, 전환 중 Enter 무시.
