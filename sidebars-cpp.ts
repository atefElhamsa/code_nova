import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  cppSidebar: [
    {
      type: 'category',
      label: 'Module 1 - C++ Basics',
      collapsed: false,
      items: [
        { type: 'doc', id: 'module1-basics/intro-and-setup', label: '1.1 Introduction & Setup' },
        { type: 'doc', id: 'module1-basics/variables-and-data-types', label: '1.2 Variables & Data Types' },
        { type: 'doc', id: 'module1-basics/operators-and-io', label: '1.3 Operators & I/O' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2 - Control Flow',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module2-control-flow/conditions', label: '2.1 Conditional Statements' },
        { type: 'doc', id: 'module2-control-flow/loops', label: '2.2 Loops' },
      ],
    },
    {
      type: 'category',
      label: 'Module 3 - Functions',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module3-functions/functions-basics', label: '3.1 Functions Basics' },
        { type: 'doc', id: 'module3-functions/advanced-functions', label: '3.2 Advanced Functions' },
      ],
    },
    {
      type: 'category',
      label: 'Module 4 - Arrays & Strings',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module4-arrays-strings/arrays', label: '4.1 Arrays' },
        { type: 'doc', id: 'module4-arrays-strings/strings-and-vectors', label: '4.2 Strings & Vectors' },
      ],
    },
    {
      type: 'category',
      label: 'Module 5 - Pointers & Memory',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module5-pointers-memory/pointers-basics', label: '5.1 Pointers Basics' },
        { type: 'doc', id: 'module5-pointers-memory/dynamic-memory', label: '5.2 Dynamic Memory Allocation' },
      ],
    },
    {
      type: 'category',
      label: 'Module 6 - OOP in C++',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module6-oop/classes-objects', label: '6.1 Classes & Objects' },
        { type: 'doc', id: 'module6-oop/inheritance-polymorphism', label: '6.2 Inheritance & Polymorphism' },
        { type: 'doc', id: 'module6-oop/abstraction-interfaces', label: '6.3 Abstraction & Interfaces' },
      ],
    },
    {
      type: 'category',
      label: 'Module 7 - Advanced OOP',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module7-advanced-oop/operator-overloading', label: '7.1 Operator Overloading' },
        { type: 'doc', id: 'module7-advanced-oop/templates', label: '7.2 Templates' },
      ],
    },
    {
      type: 'category',
      label: 'Module 8 - STL',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module8-stl/containers', label: '8.1 Containers' },
        { type: 'doc', id: 'module8-stl/algorithms-iterators', label: '8.2 Algorithms & Iterators' },
      ],
    },
    {
      type: 'category',
      label: 'Module 9 - Errors & Files',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module9-errors-files/exceptions', label: '9.1 Exception Handling' },
        { type: 'doc', id: 'module9-errors-files/file-handling', label: '9.2 File Handling' },
      ],
    },
    {
      type: 'category',
      label: 'Module 10 - Capstone',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module10-capstone/library-system-project', label: '10.1 Library Management System' },
      ],
    },
  ],
};

export default sidebars;
