/** @type {import('eslint').Linter.Config} */

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "universe/native",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: [".storybook/*", ".config.*", "dist/**/*.{ts,mts}"],
  plugins: ["simple-import-sort"],
  overrides: [
    {
      files: ["*.config.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["*.ts", "*.tsx", "*.js"],
      rules: {
        semi: "off",
        "comma-dangle": "off",
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Side effect imports.
              ["^\\u0000"],
              // Packages `react` related packages come first.
              ["^react", "^@?\\w"],
              // Internal packages.
              ["^(@)(/.*|$)"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ],
          },
        ],
        "simple-import-sort/exports": "error",
      },
    },

    {
      files: ["src/**/__test__/*"],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/no-unescaped-entities": "warn",
    "react-hooks/rules-of-hooks": "warn",
    "import/order": "off",
  },
  settings: {
    "import/ignore": ["react-native"],
    react: {
      version: "detect",
    },
  },
};
