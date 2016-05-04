#!/bin/bash

# PUSH TO GH-PAGES

# Move to a clean gh-pages branch
if [ "$(git branch | grep gh-pages)" != "" ]
then
	git branch -D gh-pages
fi
git checkout -b gh-pages

# Build
echo "Building..."
webpack -p

echo "Removing non-deployment files..."
for x in $(git ls-files | grep -v "^demos/index.html$")
do
	git rm $x
done

echo "Adding deployment files..."
git mv demos/index.html index.html
git add bundle*

# Push to gh-pages
git commit --allow-empty -m "$(git log -1 --pretty=%B) [ci skip]"
git push -f $(git config --get remote.origin.url) gh-pages

# Move back to previous branch
git checkout -

echo "Deployed."
