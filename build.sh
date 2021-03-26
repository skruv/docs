#! /bin/bash
make_diff() {
    diff -U 1000000 -x "node_modules" -x "*.md" -x "package-lock.json" -x "diff" -x "files.json" -Nur $1 $2 | sed -n '/^diff.*/!p' | sed -n '/^---.*/!p' | sed -n '/^@@.*/!p' | sed -r 's/^\+\+\+\sstep[0-9]{1,2}\/([a-zA-Z0-9/.]*).*/\n\/\/ File: \1/g' > $2/diff
    diff -U 1000000 -x "node_modules" -x "*.md" -x "package-lock.json" -x "diff" -x "files.json" -Nur $1 $2 | lsdiff --strip 1 | jq -R -s -c 'split("\n")[:-1]' > $2/files.json
}

cd Tutorial
make_diff empty step0
make_diff step0 step1
make_diff step1 step2
make_diff step2 step3
make_diff step3 step4
make_diff step4 step5
make_diff step5 step6
make_diff step6 step7
make_diff step7 step8
make_diff step8 step9
make_diff step9 step10
make_diff step10 step11

BASEPATH=$(pwd)
FILES=./*/
for f in $FILES
do
  cd $BASEPATH/$f
  pwd
  NODE_ENV=development npm i
  npm update
  npm run build --if-present
  rm -rf node_modules
  NODE_ENV=production npm i
done
cd $BASEPATH

cd ../
npm run build-md-prism
npm run cache-bust
