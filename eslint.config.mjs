import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["*/.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,  // Define global variables here
        ...globals.node,
        jest: true,
      },
    },
    plugins: {
      js: pluginJs,
    },
    rules: {
      // Add your custom rules here
    },
  },
];