import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "@tailwindcss/postcss";
import alias from "@rollup/plugin-alias";

// Use environment variables to determine build mode
const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/echo-box.js",
    format: "iife",
    name: "EchoBox",
    sourcemap: true,
    exports: "named",
    globals: {
      preact: "preact",
    },
    extend: true,
  },
  plugins: [
    alias({
      entries: [
        {
          find: "react",
          replacement: "preact/compat",
        },
        {
          find: "react-dom",
          replacement: "preact/compat",
        },
        {
          find: "react/jsx-runtime",
          replacement: "preact/jsx-runtime",
        },
        {
          find: "react-dom/test-utils",
          replacement: "preact/test-utils",
        },
      ],
    }),

    // Resolve node modules
    resolve({
      browser: true,
      extensions: [".js", ".ts", ".tsx", ".svg"],
    }),

    // Convert CommonJS modules to ES6
    commonjs(),

    // Process TypeScript
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: true,
      inlineSources: !production,
    }),

    // Process CSS with PostCSS and Tailwind
    postcss({
      extensions: [".css"],
      extract: false, // Don't extract CSS to separate file
      minimize: production, // Minify in production
      inject: true, // Add CSS to the bundle
      plugins: [tailwindcss()],
    }),

    // Minify in production
    production &&
      terser({
        format: {
          comments: false,
        },
      }),
  ],
};
