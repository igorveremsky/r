#!/bin/bash
node build/node/concat.js
node build/node/uglify.js
rm -r r.js
node build/node/version.js
sh build/bash/copy.sh
