module.exports = {
  title: "Civet",
  tagline: "Painless data integration for your React application",
  url: "https://civet.js.org",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "civet-org", // Usually your GitHub org/user name.
  projectName: "civet-org.github.io", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Civet",
      logo: {
        alt: "Civet Logo",
        src: "img/civet-square-dark.png",
        srcDark: "img/civet-square-light.png",
      },
      links: [
        {
          to: "docs/getting-started",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/civet-org",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "Civet Logo",
        src: "img/civet-square-light.png",
      },
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/getting-started",
            },
            {
              label: "Guides",
              to: "docs/guides",
            },
            {
              label: "API Reference",
              to: "/docs/api",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/civet-org",
            },
            {
              label: "NPM",
              href: "https://www.npmjs.com/org/civet",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Aaron Burmeister. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: "getting-started",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/civet-org/civet-org.github.io/edit/source/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/civet-org/civet-org.github.io/edit/source/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
