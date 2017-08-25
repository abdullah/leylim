var babel = require('rollup-plugin-babel');
var babelrc = require('babelrc-rollup').default;
var istanbul = require('rollup-plugin-istanbul');
var uglify = require('rollup-plugin-uglify');

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [babel(babelrc())];

if (process.env.NODE_ENV !== 'production') {
  plugins.push(
    istanbul({
      exclude: ['test/**/*', 'node_modules/**/*']
    })
  );
} else {
  plugins.push(uglify());
}

module.exports = {
  io: {
    input: 'lib/index.js',
    plugins: plugins,
    external: external
  },
  op: {
    file: pkg.main,
    format: 'umd',
    name: 'Leylim',
    sourcemap: true
  }
};
