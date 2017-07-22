var babel = require('rollup-plugin-babel');
var babelrc = require('babelrc-rollup').default;
var istanbul = require('rollup-plugin-istanbul');
var serve = require('rollup-plugin-serve');
var livereload = require('rollup-plugin-livereload');
var uglify = require('rollup-plugin-uglify');

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [
  babel(babelrc()),
];

if (process.env.BUILD !== 'production') {
  plugins.push(
    serve({
      open: true,
      host: 'localhost',
      contentBase: ['./'],
      port: 1992
    }),
    livereload({
      watch: ['dist']
    }),
    istanbul({
      exclude: ['test/**/*', 'node_modules/**/*']
    })
  );
} else {
  plugins.push(
    uglify()
  )
}


module.exports = {
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
