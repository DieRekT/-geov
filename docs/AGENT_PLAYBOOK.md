# GeoVault Agent Playbook

## 1. Project Overview & Goals
- **Objective**: Deliver a clean, responsive static web app (HTML/CSS/JS) with sidebar navigation, Leaflet map, chat stub, clock/calendar, and "Add New Find" modal.
- **Success Criteria**:
  - All UI elements match the existing `index.html` master layout pixel‑perfectly.
  - Map supports pin‑dropping and metadata entry.
  - Chat, Calendar, Logbook & Settings stubs are scaffolded and navigable.
  - No console errors; passes linting, accessibility, and basic unit tests.

## 2. File & Folder Structure
```
geovault/
├── public/                     ← static assets
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── sidebar.js
│   │   ├── map.js
│   │   ├── chat.js
│   │   ├── calendar.js
│   │   └── modal.js
│   └── images/
├── index.html                  ← master layout (provided)
├── README.md
├── .gitignore
├── package.json                ← for tooling (lint/test)
└── tests/
    └── ui.test.js              ← simple DOM tests
```

## 3. Agent Development Stages

| Stage | Task | Done When… |
|-------|------|------------|
| 1 | **Bootstrap**: clone repo, install dev deps (ESLint, Jest) | `npm install` passes; lint no errors |
| 2 | **Sidebar Navigation**: implement JS to toggle views (Calendar, Map, Logbook, Settings) | Switching tabs shows/hides correct containers, no flash |
| 3 | **Clock & Calendar**: live clock; calendar modal scaffold & open/close logic | Clock updates every second; calendar modal opens on click |
| 4 | **Leaflet Map**: initialize map, center on user location fallback, add "➕ Drop a Pin" btn | Map loads at sensible coords; clicking btn drops editable pin |
| 5 | **Add New Find Modal**: form scaffold (photo upload, coords, notes, tags) | Modal opens on pin double‑click; form fields present |
| 6 | **Chat Assistant Stub**: embed chat panel with placeholder; input box logs to console | Typing/submitting logs message; panel collapsible |
| 7 | **Responsive & Theming**: ensure gradient background, flex layout, mobile breakpoints | Layout adapts to <768px; no overflow or layout breaks |
| 8 | **Testing & QA**: write minimal Jest tests for sidebar, modal logic; run lint + a11y check | All tests pass; no lint errors; `npm run test` = 0 failures |
| 9 | **Documentation**: complete README with setup, usage, build instructions | README covers all commands; user can launch without questions |
| 10 | **Final Review & Delivery**: agent runs `npm run lint && npm run test && open index.html` | Manual smoke check passes; final artifacts committed |

## 4. Hard Rules & Agent Behaviors

1. **No Direct Edits to `index.html` Layout**  
   – Only inject or append beneath existing elements.

2. **Pixel‑Perfect Fidelity**  
   – Compare against provided screenshots/`index.html` design at each stage.

3. **Atomic Commits & Clear Messages**  
   – Commit per feature: e.g. `feat(sidebar): implement toggle navigation`.

4. **Branch Per Stage**  
   – `stage-1-bootstrap`, `stage-2-sidebar`, … then merge into `main` with PR.

5. **Lint‑First Workflow**  
   – Fail fast on any ESLint or accessibility violations.

6. **Test‑Driven Additions**  
   – Write a Jest test before implementing any JS feature.

7. **No External Dependencies Beyond Leaflet**  
   – Agent may only add libraries if absolutely necessary and documented.

8. **Self‑Review**  
   – After each merge, agent must run a full smoke test: open in headless browser, verify no console errors, check all interactive elements respond.

## 5. Quality Gates & CI

### Pre‑merge:
- `npm run lint`
- `npm run test`
- Accessibility audit (e.g., axe‑core CLI)

### Post‑merge:
- Visual diff of `index.html` rendered snapshot (tool: Puppeteer)
- Responsiveness check at 320px/768px/1440px widths

### Delivery:
- Tag release as `v1.0.0-rockhound-ui`
- Archive zip of `public/` and `index.html`

## 6. Communication & Reporting

- **Status updates**: After each stage, agent posts:  
  > Stage N complete — "What's next?"

- **Error handling**:  
  - On any failure, agent rolls back the last commit, logs the error to `agent.log`, and alerts human:
    > "Lint errors in `map.js`: [details]. Pausing."

- **Final handover**:  
  - Agent produces a consolidated CHANGELOG and attach to PR.

Follow this playbook verbatim and GeoVault's Rockhound UI will land reliably, with no guesswork and full traceability.
