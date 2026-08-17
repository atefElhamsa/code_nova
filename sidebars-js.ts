import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebarsJs: SidebarsConfig = {
  jsSidebar: [
    {
      type: 'category',
      label: ' Part 1 - JS Fundamentals',
      collapsed: false,
      items: [
        { type: 'doc', id: 'part1-fundamentals/variables', label: '1.1 Variables & Data Types' },
        { type: 'doc', id: 'part1-fundamentals/data-types-operators', label: '1.2 Data Types & Operators' },
        { type: 'doc', id: 'part1-fundamentals/control-flow', label: '1.3 Control Flow' },
        { type: 'doc', id: 'part1-fundamentals/functions', label: '1.4 Functions & Arrow' },
        { type: 'doc', id: 'part1-fundamentals/scope-hoisting', label: '1.5 Scope & Hoisting' },
      ],
    },
    {
      type: 'category',
      label: ' Part 2 - Objects & Arrays',
      collapsed: true,
      items: [
        { type: 'doc', id: 'part2-objects-arrays/objects', label: '2.1 Object Literals & Methods' },
        { type: 'doc', id: 'part2-objects-arrays/arrays-methods', label: '2.2 Array Methods (map, filter...)' },
        { type: 'doc', id: 'part2-objects-arrays/destructuring-spread', label: '2.3 Destructuring & Spread' },
      ],
    },
    {
      type: 'category',
      label: ' Part 3 - OOP in JavaScript',
      collapsed: true,
      items: [
        { type: 'doc', id: 'part3-oop/classes-constructors', label: '3.1 Classes & Constructors' },
        { type: 'doc', id: 'part3-oop/inheritance', label: '3.2 Inheritance' },
        { type: 'doc', id: 'part3-oop/this-keyword', label: '3.3 The `this` Keyword' },
        { type: 'doc', id: 'part3-oop/prototypes', label: '3.4 Intro to Prototypes' },
      ],
    },
    {
      type: 'category',
      label: ' Part 4 - Async JavaScript',
      collapsed: true,
      items: [
        { type: 'doc', id: 'part4-async/callbacks-event-loop', label: '4.1 Callbacks & Event Loop' },
        { type: 'doc', id: 'part4-async/promises', label: '4.2 Promises' },
        { type: 'doc', id: 'part4-async/async-await', label: '4.3 Async/Await' },
      ],
    },
    {
      type: 'category',
      label: ' Part 5 - DOM & Browser APIs',
      collapsed: true,
      items: [
        { type: 'doc', id: 'part5-dom/dom-manipulation', label: '5.1 DOM Manipulation' },
        { type: 'doc', id: 'part5-dom/events', label: '5.2 Events & Listeners' },
        { type: 'doc', id: 'part5-dom/fetch-api', label: '5.3 Fetch API' },
      ],
    },
    {
      type: 'category',
      label: ' Part 6 - Modern JS (ES6+)',
      collapsed: true,
      items: [
        { type: 'doc', id: 'part6-modern-js/modules', label: '6.1 ES Modules (import/export)' },
        { type: 'doc', id: 'part6-modern-js/template-literals-operators', label: '6.2 Optional Chaining & Nullish' },
      ],
    },
    {
      type: 'category',
      label: ' Part 7 - Mini Project (To-Do)',
      collapsed: true,
      items: [
        { type: 'doc', id: 'part7-project/setup-ui', label: '7.1 Project Setup & UI' },
        { type: 'doc', id: 'part7-project/state-events', label: '7.2 State & Events' },
        { type: 'doc', id: 'part7-project/local-storage-polish', label: '7.3 LocalStorage & Polish' },
      ],
    },
  ],
};

export default sidebarsJs;
