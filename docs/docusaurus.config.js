// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import path from "path";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Docusaurus Code Block Fullscreen",
  tagline: "Add fullscreen functionality to code blocks in your Docusaurus documentation.",
  favicon: "img/fullscreen.svg",

  // Set the production url of your site here
  url: "https://frostybee.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/docusaurus-plugin-fullscreen/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "frostybee", // Usually your GitHub org/user name.
  projectName: "docusaurus-plugin-fullscreen", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // plugins: [
  //   'docusaurus-plugin-fullscreen',
  // ],
  // Add your plugins here
  //  plugins: [
  //   path.resolve(__dirname, '../packages/docusaurus-plugin-fullscreen/src/index.js'),
  // ],
  plugins: [
   [
      'docusaurus-plugin-fullscreen',
      {
        // Custom tooltip text for the fullscreen button
        fullscreenButtonTooltip: "Toggle fullscreen mode",
        
        // Whether to enable ESC key to exit fullscreen
        enableEscapeKey: true,
        
        // Whether to exit fullscreen when browser back button is pressed
        exitOnBrowserBack: true,
        
        // Whether to add fullscreen buttons to code blocks without titles
        addToFramelessBlocks: true,
                
        // Zoom level when in fullscreen mode (percentage)
        fullscreenZoomLevel: 120,
        
        // Animation duration in milliseconds
        animationDuration: 200,
        
        // Custom SVG paths for fullscreen icons (optional)
        svgPathFullscreenOn: "M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z",
        svgPathFullscreenOff: "M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z",
        
        // Custom CSS class for the fullscreen container
        fullscreenContainerClass: "docusaurus-code-fullscreen-container"
      }
    ]
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.          
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.          
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Docusaurus Code Block Fullscreen",
        logo: {
          alt: "Docusaurus Code Block Fullscreen",
          src: "img/fullscreen.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docSidebar",
            position: "left",
            label: "Docs",
          },
          { to: "/blog", label: "Changelog", position: "left" },
          {
            href: "https://github.com/frostybee/docusaurus-plugin-fullscreen",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Docs",
                to: "/docs",
              },
            ],
          },          
          {
            title: "More",
            items: [
              {
                label: "Changelog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/frostybee/docusaurus-plugin-fullscreen",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Docusaurus Code Block Fullscreen Plugin. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};
export default config;
