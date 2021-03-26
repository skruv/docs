#!/bin/bash
{ ssh -o StrictHostKeyChecking=no root@sfo3.server.skruv.io "tail -f /var/log/nginx/access.log" & ssh -o StrictHostKeyChecking=no root@ams3.server.skruv.io "tail -f /var/log/nginx/access.log" & ssh -o StrictHostKeyChecking=no root@sgp1.server.skruv.io "tail -f /var/log/nginx/access.log"; } | \
/usr/bin/goaccess \
--log-format=COMBINED \
--ignore-crawlers \
--db-path /var/www/goaccess \
--persist \
--restore \
--port 8080 \
--output /var/www/docs/goaccess.html \
--ws-url "wss://skruv.io:443/ws" \
--real-time-html \
-
