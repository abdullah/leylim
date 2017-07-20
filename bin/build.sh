rm -rf dist
eslint lib
gulp image
gulp css
gulp bundle-component
rollup -c --environment BUILD:production
