import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import copy from 'rollup-plugin-copy-glob';
import {terser} from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import less from 'rollup-plugin-less';

const replace = require('replace-in-file');
const pkg = require('./package.json');
const {PRODUCTION} = process.env;

const tsImportPluginFactory = require('ts-import-plugin');

const tsImportPlugin = tsImportPluginFactory({
  libraryDirectory: 'es',
  libraryName: 'antd',
  style: true,
});

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: ['src/module.ts'],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom', '@grafana/ui'],
  watch: {
    include: 'src/**',
  },
  plugins: [
    resolve(),

    // Allow json resolution
    json(),

    // Compile TypeScript files
    typescript({
      typescript: require('typescript'),
      tsconfig: 'tsconfig.json',
      transformers: () => ({
        before: [tsImportPlugin],
      }),
    }),

    babel({
      extensions,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
    }),

    // Transform Antd styles
    less({
      insert: 'true',
      options: {
        javascriptEnabled: true,
        modifyVars: {
          //Ant design style overrides
          '@primary-color': '#BADA55',
        },
      },
    }),

    // Trial and error adding things as build fails
    commonjs({
      namedExports: {
        'node_modules/babel-runtime/helpers/extends.js': ['_extends'],
        'node_modules/react-is/index.js': ['isFragment'],
        'node_modules/fbjs/lib/ExecutionEnvironment.js': ['canUseDOM'],
        'node_modules/rc-editor-core/node_modules/immutable/dist/immutable.js': [
          'Map',
          'OrderedSet',
          'Repeat',
          'List',
          'fromJS',
          'is',
        ],
        'node_modules/draft-js/lib/Draft.js': [
          'EditorState',
          'ContentState,',
          'Modifier',
          'KeyBindingUtil',
          'BlockMapBuilder',
          'DefaultDraftInlineStyle',
          'genKey',
          'ContentBlock',
          'CharacterMetadata',
          'convertFromHTML',
        ],
        'node_modules/draft-js/lib/DraftOffsetKey.js': ['decode'],
        'node_modules/immutable/dist/immutable.js': ['Map'],
      },
    }),

    // Resolve source maps to the original source
    sourceMaps(),

    // Minify
    PRODUCTION && terser(),

    // Copy files
    copy([{files: 'src/**/*.{json,svg,png,html}', dest: 'dist'}], {verbose: true}),

    // Help avoid including things accidentally
    visualizer({
      filename: 'dist/stats.html',
      title: 'Plugin Stats',
    }),

    // Custom callback when we are done
    finish(),
  ],
};

function finish() {
  return {
    name: 'finish',
    buildEnd() {
      const files = 'dist/plugin.json';
      replace.sync({
        files: files,
        from: /%VERSION%/g,
        to: pkg.version,
      });
      replace.sync({
        files: files,
        from: /%TODAY%/g,
        to: new Date().toISOString().substring(0, 10),
      });

      if (PRODUCTION) {
        console.log('*minified*');
      }
    },
  };
}
