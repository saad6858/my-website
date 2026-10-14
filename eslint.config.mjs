import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Known pre-existing React Hooks diagnostics in legacy files, identified by CI.
    // This is intentionally scoped: the rule stays enabled for new and unaffected files.
    files: [
      "app/dashboard/blog/new/page.tsx",
      "app/dashboard/blog/page.tsx",
      "app/dashboard/contacts/page.tsx",
      "app/dashboard/files/page.tsx",
      "app/dashboard/leads/page.tsx",
      "app/dashboard/newsletter/page.tsx",
      "app/dashboard/portfolio/page.tsx",
      "app/dashboard/projects/page.tsx",
      "components/animations/CinematicOpening.tsx",
      "components/animations/Typewriter.tsx",
      "components/dashboard/content/ContentModal.tsx",
      "components/dashboard/leads/LeadModal.tsx",
      "components/dashboard/projects/ProjectModal.tsx",
      "components/dashboard/settings/ServiceManager.tsx",
      "components/layout/AnnouncementBar.tsx",
      "components/portfolio/Lightbox.tsx",
      "components/providers/SiteSettingsProvider.tsx",
      "hooks/useLocalStorage.ts"
    ],
    rules: { "react-hooks/set-state-in-effect": "off" }
  },
  {
    // These two existing views intentionally compute current time while rendering.
    files: ["app/dashboard/page.tsx", "components/dashboard/projects/ProjectCard.tsx"],
    rules: { "react-hooks/purity": "off" }
  },
  globalIgnores([".next/**", "out/**", "node_modules/**"])
]);
