#!/bin/sh

git clone git@github.com:memochou1993/nyan-profile.git

cd nyan-profile

rm -rf .git

git init
git add .
git commit -m "Initial commit"

cd ..
