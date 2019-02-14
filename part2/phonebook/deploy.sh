#!/bin/bash
set -ex
npm run build

dir="../../../hy-fullstack-phonebook-backend/build"
rm -rf $dir
cp -r build $dir
rm -rf build
