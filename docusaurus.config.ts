import {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'CodeNova Academy',
  tagline: 'Master modern development',
  favicon: 'img/codeNovaLogo.jpg',

  url: 'https://doc-flutter.local',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

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

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'javascript',
        path: 'docs-js',
        routeBasePath: 'docs-js',
        sidebarPath: './sidebars-js.ts',
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} CodeNova Academy. Built with Docusaurus.`,
    },
    navbar: {
      title: 'CodeNova Academy',
      logo: {
        alt: 'Logo',
        src: 'img/codeNovaLogo.jpg', // Ensure you have a logo or it might break, fallback to empty string if not needed but doc_flutter probably has it
      },
      items: [
        {to: '/flutter', label: 'Flutter Course', position: 'left'},
        {to: '/javascript', label: 'JavaScript Course', position: 'left'},
        {to: '/', label: 'Hub', position: 'right'},
      ],
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
