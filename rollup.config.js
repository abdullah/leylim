import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [
  babel(babelrc()),
  serve({
    open: true,
    host: 'localhost',
    contentBase: ['./'],
    port: 1992
  }),
  livereload({
    watch: ['dist', 'docs']
  })
];

if (process.env.BUILD !== 'production') {
  plugins.push(
    istanbul({
      exclude: ['test/**/*', 'node_modules/**/*']
    })
  );
}

export default {
  entry: 'lib/index.js',
  plugins: plugins,
  external: external,
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'Leylim',
      sourceMap: true
    }
  ]
};
