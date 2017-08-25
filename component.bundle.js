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
  },
  plugin: {
    src: 'lib/plugins',
    dist: 'dist/plugins'
  }
};
// Bundle it
const plugins = [babel(babelrc()), uglify()];

const bundle = (entry, src, dist) => {
  rollup({
    input: path.join(src, entry),
    plugins: plugins
  })
    .then(function(bundle) {
      bundle.write({
        format: 'umd',
        name: makeLegalIdentifier(entry.split('.')[0]),
        indent: false,
        file: path.join(dist, entry)
      });
      /* eslint-disable */
    })
    .catch(console.error); // log errors
};

// Get all component
fs.readdir(paths.component.src, (err, files) => {
  for (var ii = 0; ii < files.length; ii++) {
    const ext = files[ii].split('.')[1];
    if (ext === 'js') {
      bundle(files[ii], paths.component.src, paths.component.dist);
    }
  }
});

bundle('l-components.js', paths.component.src, paths.component.dist);

// Get all plugin
fs.readdir(paths.plugin.src, (err, files) => {
  for (var ii = 0; ii < files.length; ii++) {
    const ext = files[ii].split('.')[1];
    if (ext === 'js') {
      bundle(files[ii], paths.plugin.src, paths.plugin.dist);
    }
  }
});
