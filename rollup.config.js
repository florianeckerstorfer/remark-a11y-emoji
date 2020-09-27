import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'remarkA11yEmoji',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      json(),
      resolve(),
      commonjs(),
    ]
  },
  {
    input: 'src/index.js',
    external: [ 'emoji-regex', 'gemoji', 'unist-util-visit' ],
    output: {
      file: pkg.main,
      format: 'cjs',
    },
  },
];
