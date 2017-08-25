if [ -n "$(git status --porcelain)" ]; then
  echo "Please commit your changes";
else
  # install the plugins and build the static site
  gitbook install && gitbook build ./docs

  # example assets
  mkdir docs/_book/dist
  mkdir docs/_book/example

  cp -R dist/* docs/_book/dist
  cp -R example/* docs/_book/example

  # # checkout to the gh-pages branch
  git checkout gh-pages

  # # pull the latest updates
  git pull origin gh-pages --rebase

  # copy the static site files into the current directory.
  cp -R docs/_book/* .
  # cp -R _book/* .

  # remove '_book' directory
  git clean -fx _book

  # remove
  rm -rf docs/_book/example
  rm -rf docs/_book/dist

  #add all files
  git add .

  #commit
  git commit -a -m "Update docs"

  #push to the origin
  git push origin gh-pages

  #checkout to the master branch
  git checkout master
fi
