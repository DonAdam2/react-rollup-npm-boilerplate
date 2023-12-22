import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import clean from '@rollup-extras/plugin-clean';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

const packageJson = require('./package.json');

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        interop: 'compat',
        exports: 'named',
        sourcemap: true,
        inlineDynamicImports: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        exports: 'named',
        sourcemap: true,
        inlineDynamicImports: true,
      },
    ],
    plugins: [
      clean('dist'),
      postcss({
        modules: true,
        extract: 'styles.css',
        minimize: true,
        inject: false,
        sourceMap: true,
        extensions: ['.scss', '.css'],
        use: ['sass'],
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      typescript({
        tsconfig: './tsconfig.build.json',
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
];
