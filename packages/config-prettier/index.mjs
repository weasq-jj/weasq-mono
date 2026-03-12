/** @type {import("prettier").Config} */
const prettierConfig = {
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
  printWidth: 120,
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'strict',
};

export default prettierConfig;
