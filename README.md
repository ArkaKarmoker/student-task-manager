# Student Task Manager 🎓

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-47%20Passed-4BB543?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/Styling-Vanilla%20CSS-1572B6?style=flat-square&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

A modern, responsive, and student-centric **Study & Assignment Planner** web application built with **React 19** and **Vite** using pure **JavaScript** (no TypeScript) and **Vanilla CSS** (no Tailwind).

Developed specifically to fulfill and exceed all criteria outlined in the **Student Task Manager Assignment**, this application implements **100% of the Core Requirements (Features 1–7)**, **100% of the Optional Bonus Tasks (Bonuses 1–5)**, and extra polish including custom animated dropdowns, real-time search, local storage persistence, sticky footer layout, and a full automated test suite with **47 passing tests across 10 test suites**.

---

## 📑 Table of Contents

- [Overview & Objectives](#-overview--objectives)
- [Assignment Compliance Matrix](#-assignment-compliance-matrix)
- [Key Features](#-key-features)
  - [Core Features (1–7)](#1-core-required-features)
  - [Bonus Tasks (1–5)](#2-bonus-features-all-implemented)
  - [Value-Added Enhancements](#3-value-added-enhancements)
- [React Concepts Practiced](#-react-concepts-practiced)
- [Technology Stack](#-technology-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Development Server](#development-server)
  - [Automated Testing](#automated-testing)
  - [Production Build](#production-build)
- [Automated Testing Suite (47/47 Passing)](#-automated-testing-suite)
- [Author & Submission Details](#-author--submission-details)

---

## 🎯 Overview & Objectives

**Project Name:** Student Task Manager  
**Objective:** Build a React application where students can add tasks, view their task list, mark tasks as completed, delete tasks, monitor study statistics, filter by status and subject, and recover gracefully from errors.

This project exercises core and intermediate React fundamentals:
- **Component Architecture & Hierarchy:** Modular separation of concerns into smart and presentation components.
- **JSX & Conditional Rendering:** Dynamic states for empty lists, search misses, priority badges, and modal overlays.
- **Props & Event Handling:** Unidirectional data flow, custom callbacks, and accessible keyboard events.
- **Component Composition:** Reusable `Card` with slots and `children`, composable `Modal`, and `SelectDropdown`.
- **Error Handling:** Class-based `ErrorBoundary` offering friendly fallback UI and recovery triggers.
- **Persistent State:** Synchronizing local browser storage with React state via functional updaters.

---

## 📊 Assignment Compliance Matrix

| # | Assignment Requirement | Category | Implementation File | Status |
|:---:|:---|:---:|:---|:---:|
| **1** | **Display Tasks** (Titles & completion status) | Core Feature 1 | [`TaskItem.jsx`](src/components/TaskItem.jsx), [`TaskList.jsx`](src/components/TaskList.jsx) | ✅ Verified |
| **2** | **Add New Task** (Form with title input & Add Task button) | Core Feature 2 | [`TaskForm.jsx`](src/components/TaskForm.jsx) | ✅ Verified |
| **3** | **Complete a Task** (Checkbox toggle marking completed) | Core Feature 3 | [`TaskItem.jsx`](src/components/TaskItem.jsx) | ✅ Verified |
| **4** | **Delete a Task** (Remove task from the list) | Core Feature 4 | [`TaskItem.jsx`](src/components/TaskItem.jsx), [`App.jsx`](src/App.jsx) | ✅ Verified |
| **5** | **Conditional Rendering** ("No tasks available" when queue is empty) | Core Feature 5 | [`TaskList.jsx`](src/components/TaskList.jsx) | ✅ Verified |
| **6** | **Task Statistics** (Total tasks & completed tasks counter) | Core Feature 6 | [`TaskStats.jsx`](src/components/TaskStats.jsx) | ✅ Verified |
| **7** | **Form Validation** (Prevent empty or whitespace-only task submission) | Core Feature 7 | [`TaskForm.jsx`](src/components/TaskForm.jsx) | ✅ Verified |
| **B1** | **Filter Tasks by Status** (All, Completed, and Pending) | Bonus Task 1 | [`TaskFilters.jsx`](src/components/TaskFilters.jsx) | ✅ Verified |
| **B2** | **Confirmation Message / Dialog** (Before deleting a task) | Bonus Task 2 | [`Modal.jsx`](src/components/common/Modal.jsx) | ✅ Verified |
| **B3** | **Friendly Fallback UI** (When task list encounters an error) | Bonus Task 3 | [`ErrorBoundary.jsx`](src/components/common/ErrorBoundary.jsx) | ✅ Verified |
| **B4** | **Reusable `Card` Component** (Built using the `children` prop) | Bonus Task 4 | [`Card.jsx`](src/components/common/Card.jsx) | ✅ Verified |
| **B5** | **Remaining Task Counter** (Showing how many tasks are pending) | Bonus Task 5 | [`TaskStats.jsx`](src/components/TaskStats.jsx) | ✅ Verified |

---

## 🚀 Key Features

### 1. Core Required Features

1. **Display Tasks (`TaskItem.jsx` & `TaskList.jsx`)**
   - Displays all tasks clearly with title, subject badge, priority indicator, optional due date, and completion status.
   - Distinct visual state for completed items: strikethrough text, muted colors, and a green "Completed" pill badge.

2. **Add New Task (`TaskForm.jsx`)**
   - Clean task input form equipped with a title field, subject selector, priority selector, due date picker, and an **Add Task** button.
   - Clears inputs upon successful submission and gives immediate visual feedback.

3. **Complete a Task (`TaskItem.jsx`)**
   - Custom, accessible animated checkbox to toggle task completion.
   - Instant live updates across all status filters and progress statistics.

4. **Delete a Task (`TaskItem.jsx` & `Modal.jsx`)**
   - Red delete action button triggers a confirmation dialog to prevent accidental loss of important homework.

5. **Conditional Rendering (`TaskList.jsx`)**
   - When no tasks exist in the application, displays a friendly `"No tasks available"` empty state with an encouraging study message and an action to load sample tasks.
   - When a filter or search produces zero results, displays a `"No matching tasks found"` message accompanied by a **Clear All Filters** button.

6. **Task Statistics (`TaskStats.jsx`)**
   - Live dashboard cards displaying **Total Tasks**, **Completed Tasks**, and an interactive **Progress Percentage Bar** with color-coded milestone badges (e.g., "Just Getting Started", "Halfway There", "All Caught Up!").

7. **Form Validation (`TaskForm.jsx`)**
   - Rejects empty strings and whitespace-only submissions.
   - Enforces a minimum 3-character title requirement.
   - Displays clear inline error banners with alert icons and visual input highlight rings.

---

### 2. Bonus Features (All Implemented)

- 🎯 **Bonus 1 — Status Filtering:** Segmented tabs for **All Tasks**, **Pending**, and **Completed** with live count badges on each tab.
- 🛡️ **Bonus 2 — Confirmation Dialog Modal:** Accessible, keyboard-friendly (`Escape` to close, `Enter` to confirm, focus-trapped) confirmation modal with task title preview before deletion.
- 🦺 **Bonus 3 — Friendly Error Boundary Fallback:** Class-based `ErrorBoundary` component that intercepts rendering exceptions and renders an illustrated fallback UI with a **Reload Tasks** recovery button.
- 📦 **Bonus 4 — Reusable `Card` with `children`:** Flexible wrapper component built using React's `children` prop, supporting header slots (`title`, `subtitle`, `icon`, `action`), custom padding, and variants.
- ⏳ **Bonus 5 — Remaining Task Counter:** Dedicated metric card calculating `Total - Completed` in real time with high-visibility styling to help students prioritize their remaining workload.

---

### 3. Value-Added Enhancements

- 🎨 **HeroUI-Inspired Custom Animated Select Dropdown (`SelectDropdown.jsx`):**
  - Smooth scale and opacity transitions, colored subject indicators, helper descriptions, full keyboard navigation (Arrow Up/Down, Enter, Space, Escape), outside click detection, and customized slim scrollbars.
- 🔍 **Real-Time Live Search:**
  - Instant client-side search filtering across both task titles and subjects with cross-filter integration.
- 📚 **Subject Categorization:**
  - Color-coded badges for Mathematics, Computer Science, Physics, Chemistry, Biology, Literature, History, Languages, and General.
- 💾 **LocalStorage Persistence (`storage.js`):**
  - Automatically preserves task modifications in the browser's `localStorage`.
  - Includes pre-populated initial sample tasks so students or evaluators can test interactions immediately.
- 🔄 **Quick Reset & Clear All Utilities:**
  - Header actions to restore initial demo tasks or clear the entire task list with confirmation.
- 📐 **Robust Sticky Footer Layout:**
  - Custom Flexbox viewport container (`min-height: 100vh`) ensuring the footer remains pinned to the bottom of the screen with zero gap across all zoom levels (75%, 100%, 150%).
- 👤 **Developer Credits:**
  - Footer with dynamic year and verified link to author [Arka Karmoker](https://github.com/ArkaKarmoker).

---

## 💡 React Concepts Practiced

| Concept | Where It's Applied in this Project |
|:---|:---|
| **Components** | Modular decomposition into `Header`, `TaskForm`, `TaskStats`, `TaskFilters`, `TaskList`, `TaskItem`, `Card`, `Modal`, `SelectDropdown`, and `ErrorBoundary`. |
| **JSX** | Semantic HTML5 tags (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`), conditional CSS class names, and inline SVG icons. |
| **Props** | Passing callbacks (`onAddTask`, `onToggleComplete`, `onRequestDelete`), config objects, labels, and primitive values down the component hierarchy. |
| **Component Composition** | Using `props.children` in `Card.jsx` to wrap disparate forms, stats, and lists without rigid prop-drilling. |
| **Conditional Rendering** | Ternary and short-circuit operators (`&&`) for validation messages, active tabs, modal visibility, and empty queue states. |
| **Events & Forms** | `onSubmit`, `onChange`, `onClick`, keyboard event listeners (`keydown`), and synthetic event prevention (`e.preventDefault()`). |
| **Hooks** | `useState` for local states, `useEffect` for local storage syncing and document listeners, and `useMemo` for derived task calculations. |
| **Error Boundaries** | `componentDidCatch` and `getDerivedStateFromError` lifecycle methods in `ErrorBoundary.jsx` for defensive rendering. |

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|:---|:---|:---|
| **Framework** | **React 19** | Pure JavaScript (JSX), Functional Components & Hooks |
| **Build & Bundler** | **Vite 6** | Fast HMR dev server & optimized Rollup production build |
| **Language** | **JavaScript (ES2024)** | Modern ES modules, destructuring, arrow functions |
| **Styling** | **Vanilla CSS** | Custom design system, CSS variables, glassmorphism, flexbox/grid |
| **Test Runner** | **Vitest 3** | Lightning-fast Vite-native testing environment |
| **Testing Utilities** | **React Testing Library** | DOM testing with `@testing-library/jest-dom` and `jsdom` |
| **Typography** | **Google Fonts** | Inter & Outfit sans-serif typeface families |

---

## 📁 Project Directory Structure

```
student-task-manager/
├── public/
│   └── favicon.svg                  # Brand graduation cap favicon
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Card.jsx             # Reusable Card container (Bonus 4: children prop)
│   │   │   ├── ErrorBoundary.jsx    # Error boundary with fallback UI (Bonus 3)
│   │   │   ├── Modal.jsx            # Confirmation dialog for task deletion (Bonus 2)
│   │   │   └── SelectDropdown.jsx   # HeroUI-inspired custom animated dropdown
│   │   ├── __tests__/               # Component unit tests (37 tests across 9 suites)
│   │   │   ├── Card.test.jsx
│   │   │   ├── ErrorBoundary.test.jsx
│   │   │   ├── Modal.test.jsx
│   │   │   ├── SelectDropdown.test.jsx
│   │   │   ├── TaskFilters.test.jsx
│   │   │   ├── TaskForm.test.jsx
│   │   │   ├── TaskItem.test.jsx
│   │   │   ├── TaskList.test.jsx
│   │   │   └── TaskStats.test.jsx
│   │   ├── Header.jsx               # Brand header with demo reset & clear actions
│   │   ├── TaskFilters.jsx          # Status tabs, search input, and subject filter (Bonus 1)
│   │   ├── TaskForm.jsx             # Form with validation and dropdowns (Features 2 & 7)
│   │   ├── TaskItem.jsx             # Task item with toggle and delete trigger (Features 1, 3, 4)
│   │   ├── TaskList.jsx             # List container with conditional empty states (Feature 5)
│   │   └── TaskStats.jsx            # Statistics dashboard & remaining counter (Feature 6, Bonus 5)
│   ├── __tests__/
│   │   └── App.test.jsx             # Integration tests for end-to-end workflows (7 tests)
│   ├── utils/
│   │   └── storage.js               # LocalStorage utilities & starter dataset
│   ├── App.css                      # Application styling & layout
│   ├── App.jsx                      # Top-level state orchestration & modal binding
│   ├── index.css                    # CSS variables, typography tokens, and reset
│   ├── main.jsx                     # Application entry point
│   └── setupTests.js                # Test setup for Vitest & Jest-DOM matchers
├── dist/                            # Production build output
├── index.html                       # HTML template with SEO metadata
├── package.json                     # Project manifest, scripts, and dependencies
├── vite.config.js                   # Vite and Vitest configuration
├── student_task_manager_assignment.md # Original assignment specification
└── README.md                        # Project documentation
```

---

## 🚦 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher (tested on Node v20 & v24)
- **npm**: v9.0.0 or higher

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ArkaKarmoker/student-task-manager.git
   cd student-task-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development Server

Run the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### Automated Testing

Run the complete test suite once:
```bash
npm test
```

To run the test suite in interactive watch mode during development:
```bash
npm run test:watch
```

### Production Build

Create an optimized, minified production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 🧪 Automated Testing Suite

The project includes **47 comprehensive automated tests** across **10 test files**, ensuring all assignment criteria, edge cases, and user interactions are strictly validated:

| Test Suite File | Tests | Focus Areas / Test Scenarios |
|:---|:---:|:---|
| `Card.test.jsx` | 4 | Children rendering, title/subtitle props, action slot, custom classNames |
| `TaskForm.test.jsx` | 6 | Empty title validation, whitespace rejection, min length (3 chars), field reset, dropdown interaction |
| `TaskStats.test.jsx` | 5 | Total tasks, completed tasks, remaining counter (Bonus 5), progress % calculation, zero tasks fallback |
| `TaskFilters.test.jsx` | 5 | Tab switching (All/Pending/Completed), badge counts, search input changes, subject selection |
| `TaskItem.test.jsx` | 4 | Title and badge rendering, completed strikethrough state, toggle complete callback, delete trigger |
| `TaskList.test.jsx` | 3 | "No tasks available" empty state, "No matching tasks" with filter reset button, task rendering |
| `Modal.test.jsx` | 5 | Open/close visibility, task title display, Escape key dismissal, backdrop click, confirm & cancel actions |
| `SelectDropdown.test.jsx` | 5 | Closed default, toggle menu on click, option selection callback, keyboard navigation, outside click |
| `ErrorBoundary.test.jsx` | 3 | Normal children rendering, catching child runtime errors, friendly fallback UI with retry button |
| `App.test.jsx` | 7 | Full integration: Initial task loading, adding tasks, toggling completion, modal deletion, status filtering, live search |
| **Total** | **47** | **100% Pass Rate across all 10 Test Suites** |

---

## 👨‍💻 Author & Submission Details

- **Student / Developer:** Arka Karmoker
- **GitHub Profile:** [@ArkaKarmoker](https://github.com/ArkaKarmoker)
- **Repository:** [https://github.com/ArkaKarmoker/student-task-manager](https://github.com/ArkaKarmoker/student-task-manager)
- **Course / Project:** Student Task Manager Assignment

---

*Built with passion, clean code principles, and modern React practices.*
