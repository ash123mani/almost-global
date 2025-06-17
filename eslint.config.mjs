import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      indent: ['error', 2, {
        "SwitchCase": 1,      // Indent switch case clauses (1 level = 2 spaces)
        "VariableDeclarator": { "var": 2, "let": 2, "const": 2 },
        "outerIIFEBody": 1,   // Immediately Invoked Function Expressions
        "MemberExpression": 1, // Indent property chaining (obj.prop.prop)
        "FunctionDeclaration": { "parameters": 1, "body": 1 },
        "FunctionExpression": { "parameters": 1, "body": 1 },
        "CallExpression": { "arguments": 1 },
        "ArrayExpression": 1,
        "ObjectExpression": 1,
        "ImportDeclaration": 1,
        "flatTernaryExpressions": false // Don't force indentation in ternaries
      }],
      "react/jsx-first-prop-new-line": ["error", "multiline"], // Newline if multiline
      "react/jsx-max-props-per-line": ["error", { "maximum": 4 }], // Only 1 prop per line
      "react/jsx-closing-bracket-location": ["error", "line-aligned"], // Align closing tag
      "react/jsx-indent-props": ["error", 2], // 2-space indent for props
      "object-curly-spacing": ["error", "always"], // Space inside { }
    }
  }
];

export default eslintConfig;
