#!/bin/bash
echo "deb https://deb.goaccess.io/ $(lsb_release -cs) main" | tee -a /etc/apt/sources.list.d/goaccess.list
curl https://deb.goaccess.io/gnugpg.key | apt-key --keyring /etc/apt/trusted.gpg.d/goaccess.gpg add -
DEBIAN_FRONTEND=noninteractive apt-get -o Dpkg::Options::=--force-confold -o Dpkg::Options::=--force-confdef -y --allow-downgrades --allow-remove-essential --allow-change-held-packages update
DEBIAN_FRONTEND=noninteractive apt-get -o Dpkg::Options::=--force-confold -o Dpkg::Options::=--force-confdef -y --allow-downgrades --allow-remove-essential --allow-change-held-packages install git libpcre3 libpcre3-dev zlib1g zlib1g-dev openssl libssl-dev nginx nginx-extras brotli goaccess nodejs git npm jq multitail python3-pip patchutils

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install v14

pip3 install dns-lexicon

export PROVIDER=rage4
curl https://get.acme.sh | sh
# /root/.acme.sh/acme.sh --issue -d skruv.io -d '*.skruv.io' -d '*.server.skruv.io' --dns dns_lexicon
# mkdir -p /etc/nginx/certs/skruv.io
# /root/.acme.sh/acme.sh --install-cert -d skruv.io --cert-file /etc/nginx/certs/skruv.io/cert.pem --key-file /etc/nginx/certs/skruv.io/key.pem --fullchain-file /etc/nginx/certs/skruv.io/fullchain.pem

version=$(nginx -v 2>&1 | grep -o '[0-9.]*')
/var/www/docs/server/build_ngx_brotli.sh $version
ln -s /var/www/docs/confs/05nginxmodules /etc/apt/apt.conf.d/05nginxmodules

ln -s /var/www/docs/confs/skruv.io /etc/nginx/sites-enabled/skruv.io
rm -f /etc/nginx/nginx.conf /etc/nginx/sites-enabled/default
ln -s /var/www/docs/confs/nginx.conf /etc/nginx/nginx.conf
/var/www/docs/server/update_server.sh

mkdir -p /var/www/goaccess
ln -s /var/www/docs/deploy/modules/server/systemd/goaccess.service /etc/systemd/system/goaccess.service
systemctl enable --now goaccess.service
systemctl restart nginx
