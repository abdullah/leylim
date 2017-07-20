import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';
import fs from 'fs';
import path from 'path';
import { makeLegalIdentifier } from 'rollup-pluginutils';

const folder = 'lib/components';
const outFolder = 'dist/components';
const assetFile = 'lib/assets/leylim.css';
const assetFileOut = 'dist/leylim.css';

// Get all component
fs.readdir(folder, (err, files) => {
  for (var ii = 0; ii < files.length; ii++) {
    generateComponent(files[ii]);
  }
});

// Bundle it
const plugins = [
  babel(babelrc()),
  uglify()
]
const generateComponent = (entry) => {
  rollup({
    entry: path.join(folder, entry),
    plugins: plugins,
  }).then(function (bundle) {
    bundle.write({
      format: 'umd',
      moduleName: makeLegalIdentifier(entry.split('.')[0]),
      indent: false,
      dest: path.join(outFolder, entry)
    });
    /* eslint-disable */
  }).catch(console.error); // log errors
}

generateComponent('l-components.js');

// copy css files
fs.createReadStream(assetFile).pipe(fs.createWriteStream(assetFileOut));
