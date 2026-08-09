import {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'Dart & Flutter Pro',
  tagline: 'The complete guide to Dart & Flutter',
  favicon: 'img/logo.svg',

  url: 'https://doc-flutter.local',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  plugins: [
    function fixNode24WebpackProgressPlugin() {
      return {
        name: 'fix-node24-webpack-progress-plugin',
        configureWebpack(config) {
          return {
            plugins: config.plugins?.filter(
              (p) => p && p.constructor && p.constructor.name !== 'ProgressPlugin'
            ),
          };
        },
      };
    },
  ],

  i18n: {
    defaultLocale: 'ar',
    locales: ['ar'],
    localeConfigs: {
      ar: {
        label: 'العربية',
        direction: 'rtl',
        htmlLang: 'ar-SA',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Dart & Flutter Pro',
      logo: {
        alt: 'Flutter Logo',
        src: 'img/logo.svg',
      },
      items: [],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Course Parts',
          items: [
            { label: 'Part 1 | Dart Fundamentals', to: '/docs/part1-dart-fundamentals/variables-and-data-types' },
            { label: 'Part 2 | Flutter Basics', to: '/docs/part2-flutter-basics/setup-and-architecture' },
            { label: 'Part 3 | Clean Code', to: '/docs/part3-clean-code/clean-code-naming' },
            { label: 'Part 4 | MVVM State', to: '/docs/part4-mvvm-state-management/intro-to-mvvm' },
            { label: 'Part 5 | Backend Integration', to: '/docs/part5-backend-integration/dio-and-interceptors' },
            { label: 'Part 6 | Testing', to: '/docs/part6-testing/unit-testing' },
            { label: 'Part 7 | Capstone Project', to: '/docs/part7-capstone-project/project-setup' },
          ],
        },
        {
          title: 'Architecture & Patterns',
          items: [
            { label: 'SOLID & SRP', to: '/docs/part3-clean-code/solid-and-srp' },
            { label: 'Feature-First Structure', to: '/docs/part3-clean-code/feature-first-folder-structure' },
            { label: 'State Management', to: '/docs/part4-mvvm-state-management/changenotifier-and-provider' },
            { label: 'Repository Pattern', to: '/docs/part5-backend-integration/repository-pattern' },
          ],
        },
      ],
      copyright: `All rights reserved © ${new Date().getFullYear()} | Dart & Flutter Pro Course`,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['dart', 'json', 'bash', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
