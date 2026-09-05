import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
  {
    rules: {
      // The client components read the DOM, `navigator`, and open/close state
      // in an effect on purpose — that is what keeps the server and client
      // renders identical through hydration. Kept as a warning so genuinely
      // new cascading-render bugs still surface without gating the deploy.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
