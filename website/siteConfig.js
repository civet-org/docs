/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: "Civet", // Title for your website.
  tagline: "Painless data integration in your React application",
  url: "https://civet.js.org", // Your website URL
  baseUrl: "/", // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  cname: "civet.js.org",
  projectName: "civet-org.github.io",
  organizationName: "civet-org",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "getting-started", label: "Docs" },
    { doc: "api", label: "API" },
    { page: "help", label: "Help" },
    { blog: true, label: "Blog" }
  ],

  /* path to images for header/footer */
  headerIcon: "img/civet-square-light.png",
  footerIcon: "img/civet-square-light.png",
  favicon: "img/favicon.png",

  /* Colors for website */
  colors: {
    primaryColor: "#ff4e0e",
    secondaryColor: "#ffc70e"
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Aaron Burmeister`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default"
  },
  usePrism: ["bash", "js", "jsx"],

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],

  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: "img/civet.png",
  twitterImage: "img/civet.png",

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  githubUrl: "https://github.com/civet-org",
  npmUrl: "https://www.npmjs.com/org/civet",
  embeddedSandbox:
    '<iframe src="https://codesandbox.io/embed/civet-demo-l22kk8mj3m?autoresize=1&fontsize=14" title="Civet Demo" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>'
};

module.exports = siteConfig;
