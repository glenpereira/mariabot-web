// eslint-disable-next-line no-undef
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  ignorePatterns: ['ml2en.js'],
  rules: {
    "react-refresh/only-export-components": "warn",
    "strict": "off",
    "no-unused-vars": "warn",
    "react/prop-types": "off"
  },
};
