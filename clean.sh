#! /bin/bash
find Tutorial -name 'diff.js' -delete
find Tutorial -name 'diff' -delete
find Tutorial -name '*.*.js' -delete
find Tutorial -name 'files.json' -delete
find API -name '*.*.js' -delete
find . -name '*.gz' -delete
find . -name '*.br' -delete
rm -rf Tutorial/*/libraries_built
