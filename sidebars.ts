import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  courseSidebar: [
    {
      type: 'category',
      label: ' Part 1 - Dart Fundamentals',
      collapsed: false,
      items: [
        { type: 'doc', id: 'part1-dart-fundamentals/variables-and-data-types', label: '1.1 Variables & Data Types' },
        { type: 'doc', id: 'part1-dart-fundamentals/null-safety', label: '1.2 Sound Null Safety' },
        { type: 'doc', id: 'part1-dart-fundamentals/control-flow', label: '1.3 Control Flow & Pattern Matching' },
        { type: 'doc', id: 'part1-dart-fundamentals/functions', label: '1.4 Functions & Lexical Scope' },
        { type: 'doc', id: 'part1-dart-fundamentals/collections', label: '1.5 Collections & Higher-Order Methods' },
        { type: 'doc', id: 'part1-dart-fundamentals/oop-basics', label: '1.6 OOP Basics - Classes & Objects' },
        { type: 'doc', id: 'part1-dart-fundamentals/oop-advanced', label: '1.7 OOP Advanced - Mixins & Extensions' },
        { type: 'doc', id: 'part1-dart-fundamentals/generics', label: '1.8 Generics' },
        { type: 'doc', id: 'part1-dart-fundamentals/async-programming', label: '1.9 Async / Futures / Streams' },
      ],
    },
    {
      type: 'category',
      label: ' Part 2 - Flutter Basics',
      collapsed: true,
      items: [
        { type: 'doc', id: 'part2-flutter-basics/setup-and-architecture', label: '2.1 Setup & Architecture' },
        { type: 'doc', id: 'part2-flutter-basics/widget-and-element-tree', label: '2.2 Widget & Element Tree' },
        { type: 'doc', id: 'part2-flutter-basics/layout-widgets', label: '2.3 Layout Widgets' },
        { type: 'doc', id: 'part2-flutter-basics/scrollable-views', label: '2.4 Scrollable Views' },
        { type: 'doc', id: 'part2-flutter-basics/navigation-go-router', label: '2.5 Navigation with go_router' },
        { type: 'doc', id: 'part2-flutter-basics/forms-and-validation', label: '2.6 Forms & Validation' },
        { type: 'doc', id: 'part2-flutter-basics/theming-and-dark-mode', label: '2.7 Theming & Dark Mode' },
      ],
    },
    {
      type: 'category',
      label: ' Part 3 - Clean Code',
      collapsed: true,
      items: [
        { type: 'doc', id: 'part3-clean-code/clean-code-naming', label: '3.1 Clean Naming Conventions' },
        { type: 'doc', id: 'part3-clean-code/solid-and-srp', label: '3.2 SOLID & SRP Principles' },
        { type: 'doc', id: 'part3-clean-code/feature-first-folder-structure', label: '3.3 Feature-First Folder Structure' },
        { type: 'doc', id: 'part3-clean-code/dependency-injection-get-it', label: '3.4 Dependency Injection - get_it' },
      ],
    },
    {
      type: 'category',
      label: ' Part 4 - MVVM & State Management',
      collapsed: true,
      items: [
        { type: 'doc', id: 'part4-mvvm-state-management/intro-to-mvvm', label: '4.1 Introduction to MVVM' },
        { type: 'doc', id: 'part4-mvvm-state-management/changenotifier-and-provider', label: '4.2 ChangeNotifier & Provider' },
        { type: 'doc', id: 'part4-mvvm-state-management/viewmodel-lifecycle', label: '4.3 ViewModel Lifecycle & dispose()' },
        { type: 'doc', id: 'part4-mvvm-state-management/wiring-view-viewmodel-repo', label: '4.4 Wiring View - ViewModel - Repository' },
        { type: 'doc', id: 'part4-mvvm-state-management/state-handling-ui', label: '4.5 UI State Handling - Loading / Success / Error' },
        { type: 'doc', id: 'part4-mvvm-state-management/bloc-and-cubit', label: '4.6 BLoC & Cubit State Management' },
        { type: 'doc', id: 'part4-mvvm-state-management/getx-state-management', label: '4.7 GetX State Management' },
      ],
    },
    {
      type: 'category',
      label: ' Part 5 - Backend Integration',
      collapsed: true,
      items: [
        { type: 'doc', id: 'part5-backend-integration/dio-and-interceptors', label: '5.1 Dio & Interceptors' },
        { type: 'doc', id: 'part5-backend-integration/repository-pattern', label: '5.2 Repository Pattern' },
        { type: 'doc', id: 'part5-backend-integration/error-handling-failures', label: '5.3 Failure Objects & Error Handling' },
        { type: 'doc', id: 'part5-backend-integration/json-serialization', label: '5.4 JSON Serialization - json_serializable' },
        { type: 'doc', id: 'part5-backend-integration/local-storage-shared-preferences', label: '5.5 SharedPreferences - Local Storage' },
      ],
    },
    {
      type: 'category',
      label: ' Part 6 - Testing & QA',
      collapsed: true,
      items: [
        { type: 'doc', id: 'part6-testing/unit-testing', label: '6.1 Unit Testing - ViewModels & Repositories' },
        { type: 'doc', id: 'part6-testing/widget-testing', label: '6.2 Widget Testing - WidgetTester' },
      ],
    },
    {
      type: 'category',
      label: ' Part 7 - Capstone: TaskFlow Pro',
      collapsed: true,
      items: [
        { type: 'doc', id: 'part7-capstone-project/project-setup', label: '7.1 Project Setup & Architecture' },
        { type: 'doc', id: 'part7-capstone-project/domain-data-layer', label: '7.2 Data Layer - Models & Repositories' },
        { type: 'doc', id: 'part7-capstone-project/presentation-viewmodels', label: '7.3 Presentation Layer - ViewModels' },
        { type: 'doc', id: 'part7-capstone-project/ui-implementation', label: '7.4 UI Layer - Views & Widgets' },
        { type: 'doc', id: 'part7-capstone-project/testing-and-polish', label: '7.5 Testing, Polish & Production' },
      ],
    },
  ],
};

export default sidebars;
