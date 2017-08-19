import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';
import fs from 'fs';
import path from 'path';
import { makeLegalIdentifier } from 'rollup-pluginutils';

const paths = {
  component: {
    src: 'lib/components',
    dist: 'dist/components'
  }
};
// Bundle it
const plugins = [
  babel(babelrc()),
  uglify()
];

const bundle = (entry, src, dist) => {
  rollup({
    entry: path.join(src, entry),
    plugins: plugins,
  }).then(function (bundle) {
    bundle.write({
      format: 'umd',
      moduleName: makeLegalIdentifier(entry.split('.')[0]),
      indent: false,
      dest: path.join(dist, entry)
    });
    /* eslint-disable */
  }).catch(console.error); // log errors
}


// Get all component
fs.readdir(paths.component.src, (err, files) => {
  for (var ii = 0; ii < files.length; ii++) {
    bundle(files[ii], paths.component.src, paths.component.dist);
  }
});

bundle('l-components.js', paths.component.src, paths.component.dist);
