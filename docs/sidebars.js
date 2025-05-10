// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docs: [
    "intro",
    {
      type: "category",
      label: "Начало работы",
      items: ["installation", "deployment", "pwa-installation"],
    },
    {
      type: "category",
      label: "Backend",
      items: ["backend/intro", "backend/architecture"],
    },
    {
      type: "category",
      label: "Frontend",
      items: [
        "frontend/intro",
        "frontend/fsd",
        "frontend/admin-panel",
        "frontend/api-i18n-types",
        "frontend/git-hooks",
        "frontend/workout-timer",
      ],
    },
  ],
};

export default sidebars;
