#!/bin/bash
set -ex
npm run build

dir="../../../fullstackopen_part3/build"
rm -rf $dir
cp -r build $dir
