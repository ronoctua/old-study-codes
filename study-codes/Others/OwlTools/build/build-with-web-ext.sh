#!/bin/bash

# This goes to the folder of this script
cd $(dirname "$0")

# This removes the ready-to-use folder
rm -rf ready-to-use

# This returns to the previous folder in the directory tree (root folder)
cd ..

# This builds the extension in the zip format
web-ext build -i "build/*" -i "ignore/*" -i "docs/readme/*" -i "docs/screenshots/*" -i "readme.md" -o -a build/ready-to-use

# This transforms the extension into xpi format
rename .zip .xpi build/ready-to-use/*
