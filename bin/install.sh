#!/bin/sh

git clone git@github.com:memochou1993/nyan-profile.git

cd nyan-profile

if [[ $1 != "" ]]; then
    sed -i "" "2s/nyan-profile/$1/" "package.json"
    sed -i "" "2s/nyan-profile/$1/" "package-lock.json"
    sed -i "" "8s/nyan-profile/$1/" "package-lock.json"
    sed -i "" "5s/nyan-profile/$1/" "docker-compose.yaml"
    sed -i "" "2s/nyan-profile/$1/" "nyan.config.json"
fi

rm -rf .git

git init
git add .
git commit -m "Initial commit"

cd ..
