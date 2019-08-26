# Code Splitting

There are three general approaches to code splitting available:

- Entry Points: Manually split code using [`entry`](https://webpack.js.org/configuration/entry-context) configuration.
- Prevent Duplication: Use the [`SplitChunksPlugin`](https://webpack.js.org/plugins/split-chunks-plugin/) to dedupe and split chunks.
- Dynamic Imports: Split code via inline function calls within modules.

