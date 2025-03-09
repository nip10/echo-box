import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "@tailwindcss/postcss";
import alias from "@rollup/plugin-alias";
import dts from "rollup-plugin-dts";

// Use environment variables to determine build mode
const production = !process.env.ROLLUP_WATCH;

const aliasPlugins = alias({
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
});

const commonPlugins = [
  aliasPlugins,
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
    extract: true, // Extract CSS to separate file
    minimize: production,
    plugins: [tailwindcss()],
  }),
  // Minify in production
  production &&
    terser({
      format: {
        comments: false,
      },
    }),
];

export default [
  // ESM build
  {
    input: "src/index.tsx",
    output: {
      file: "dist/index.js",
      format: "esm",
      sourcemap: true,
    },
    external: ["preact", "preact/hooks", "preact/jsx-runtime"],
    plugins: commonPlugins,
  },
  // CJS build
  {
    input: "src/index.tsx",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    external: ["preact", "preact/hooks", "preact/jsx-runtime"],
    plugins: commonPlugins,
  },
  // IIFE build (for <script> tags)
  {
    input: "src/index.tsx",
    output: {
      file: "dist/echo-box.iife.js",
      format: "iife",
      name: "EchoBox",
      sourcemap: true,
      globals: {
        preact: "preact",
        "preact/hooks": "preactHooks",
        "preact/jsx-runtime": "preactJsxRuntime",
      },
    },
    plugins: commonPlugins,
  },
  // Types
  {
    input: "src/index.tsx",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [
      postcss({
        extensions: [".css"],
        extract: true, // Extract CSS to separate file
        minimize: production,
        plugins: [tailwindcss()],
      }),
      dts({
        respectExternal: true,
        exclude: ["**/*.css"],
      }),
    ],
  },
];
