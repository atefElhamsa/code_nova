import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  pythonSidebar: [
    {
      type: 'category',
      label: 'Module 1 - Python Basics',
      collapsed: false,
      items: [
        { type: 'doc', id: 'module1-basics/intro-and-setup', label: '1.1 Introduction & Setup' },
        { type: 'doc', id: 'module1-basics/variables-and-data-types', label: '1.2 Variables & Data Types' },
      ],
    },
    {
      type: 'category',
      label: 'Module 2 - Control Flow',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module2-control-flow/conditions', label: '2.1 Conditional Statements' },
        { type: 'doc', id: 'module2-control-flow/loops-and-iterables', label: '2.2 Loops & Iterables' },
      ],
    },
    {
      type: 'category',
      label: 'Module 3 - Data Structures',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module3-data-structures/lists-and-tuples', label: '3.1 Lists & Tuples' },
        { type: 'doc', id: 'module3-data-structures/dictionaries-and-sets', label: '3.2 Dictionaries & Sets' },
      ],
    },
    {
      type: 'category',
      label: 'Module 4 - Functions',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module4-functions/functions-basics', label: '4.1 Functions Basics' },
        { type: 'doc', id: 'module4-functions/args-kwargs-lambda', label: '4.2 *args, **kwargs & Lambda' },
      ],
    },
    {
      type: 'category',
      label: 'Module 5 - OOP in Python',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module5-oop/classes-and-objects', label: '5.1 Classes & Objects' },
        { type: 'doc', id: 'module5-oop/inheritance-dunder-methods', label: '5.2 Inheritance & Dunder Methods' },
      ],
    },
    {
      type: 'category',
      label: 'Module 6 - Errors & Files',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module6-errors-files/exceptions', label: '6.1 Exception Handling' },
        { type: 'doc', id: 'module6-errors-files/file-handling-json', label: '6.2 File Handling & JSON' },
      ],
    },
    {
      type: 'category',
      label: 'Module 7 - Modules & Packages',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module7-modules-packages/imports-and-pip', label: '7.1 Imports & Pip' },
        { type: 'doc', id: 'module7-modules-packages/virtual-environments', label: '7.2 Virtual Environments' },
      ],
    },
    {
      type: 'category',
      label: 'Module 8 - Intermediate Python',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module8-intermediate/decorators-generators', label: '8.1 Decorators & Generators' },
        { type: 'doc', id: 'module8-intermediate/context-managers', label: '8.2 Context Managers' },
      ],
    },
    {
      type: 'category',
      label: 'Module 9 - Libraries',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module9-libraries/working-with-apis', label: '9.1 Working with APIs (Requests)' },
      ],
    },
    {
      type: 'category',
      label: 'Module 10 - Capstone',
      collapsed: true,
      items: [
        { type: 'doc', id: 'module10-capstone/weather-app-project', label: '10.1 Weather App' },
      ],
    },
  ],
};

export default sidebars;
