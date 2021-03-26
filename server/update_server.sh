cp -r /var/www/docs /var/www/docs-tmp
cd /var/www/docs-tmp
git fetch --all
git reset origin/main --hard
git pull
NODE_ENV=development npm i
./clean.sh
./build.sh
rm -rf node_modules
NODE_ENV=production npm i
find . -type f \( -name '*.html' -or -name '*.js' -or -name '*.css' -or -name '*.svg' -or -name 'diff' \) -print | xargs gzip -fk9
find . -type f \( -name '*.html' -or -name '*.js' -or -name '*.css' -or -name '*.svg' -or -name 'diff' \) -print | xargs brotli -fZ
mv /var/www/docs /var/www/docs-tmp2
mv /var/www/docs-tmp /var/www/docs
rm -rf /var/www/docs-tmp2
systemctl restart nginx
