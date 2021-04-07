
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    return 301 https://$host$request_uri;
}

server {
    server_name www.skruv.io;
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    ssl_certificate /etc/nginx/certs/skruv.io/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/skruv.io/key.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:MozSSL:100m;
    ssl_session_tickets on;

    # Attempt TLS 1.3 0rtt
    ssl_early_data on;

    ssl_dhparam /var/www/docs/confs/dhparam;

    # modern configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS (ngx_http_headers_module is required) (63072000 seconds)
    add_header Strict-Transport-Security "max-age=63072000" always;

    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;

    # verify chain of trust of OCSP response using Root CA and Intermediate certs
    ssl_trusted_certificate /etc/nginx/certs/skruv.io/cert.pem;

    resolver 1.1.1.1 8.8.8.8 1.0.0.1 8.8.4.4 valid=300s;
    resolver_timeout 10s;

    return 301 https://skruv.io;
}

map $http_host $rootpath {
    ~(?<mypath>.+)\.skruv\.io$  $mypath;
    default                      docs   ;
}

map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

upstream gwsocket {
    server 127.0.0.1:8080;
}

server {
    server_name skruv.io *.server.skruv.io;
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    ssl_certificate /etc/nginx/certs/skruv.io/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/skruv.io/key.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:MozSSL:100m;
    ssl_session_tickets on;

    # Attempt TLS 1.3 0rtt
    ssl_early_data on;

    ssl_dhparam /var/www/docs/confs/dhparam;

    # modern configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS (ngx_http_headers_module is required) (63072000 seconds)
    add_header Strict-Transport-Security "max-age=63072000" always;

    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;

    # verify chain of trust of OCSP response using Root CA and Intermediate certs
    ssl_trusted_certificate /etc/nginx/certs/skruv.io/cert.pem;

    resolver 1.1.1.1 8.8.8.8 1.0.0.1 8.8.4.4 valid=300s;
    resolver_timeout 10s;

    root /var/www/docs;

    add_header Content-Security-Policy "default-src 'unsafe-eval' 'unsafe-inline' 'self' data: blob: *.skruv.io; frame-ancestors *.skruv.io skruv.io;";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "same-origin";
    add_header Expect-CT "enforce, max-age=31536000";
    add_header Permissions-Policy "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), geolocation=(), gyroscope=(), layout-animations=(), magnetometer=(), microphone=(), midi=(), sync-xhr=(), usb=()";

    location / {
        try_files $uri $uri/ /index.html;
    }
    location ~* (.*)/$ {
        try_files /index.html =404;
    }
    location ~* ^/CACHE[^/]+/(.*)$ {
        alias /var/www/docs/$1;
        add_header Vary Accept-Encoding;
        etag off;
        expires max;
    }
    location = /goaccess.html {
        auth_basic "admin";
        auth_basic_user_file /var/www/.htpasswd;
    }
    location /ws {
        auth_basic "admin";
        auth_basic_user_file /var/www/.htpasswd;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_pass http://gwsocket;
        proxy_buffering off;
        proxy_read_timeout 7d;
    }
}

server {
    server_name *.skruv.io;
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    ssl_certificate /etc/nginx/certs/skruv.io/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/skruv.io/key.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:MozSSL:100m;
    ssl_session_tickets on;

    # Attempt TLS 1.3 0rtt
    ssl_early_data on;

    ssl_dhparam /var/www/docs/confs/dhparam;

    # modern configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS (ngx_http_headers_module is required) (63072000 seconds)
    add_header Strict-Transport-Security "max-age=63072000" always;

    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;

    # verify chain of trust of OCSP response using Root CA and Intermediate certs
    ssl_trusted_certificate /etc/nginx/certs/skruv.io/cert.pem;

    resolver 1.1.1.1 8.8.8.8 1.0.0.1 8.8.4.4 valid=300s;
    resolver_timeout 10s;

    root /var/www/docs/Tutorial/$rootpath;

    add_header Content-Security-Policy "default-src 'unsafe-eval' 'unsafe-inline' 'self' data: blob: *.skruv.io; frame-ancestors *.skruv.io skruv.io;";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "same-origin";
    add_header Expect-CT "enforce, max-age=31536000";
    add_header Permissions-Policy "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), geolocation=(), gyroscope=(), layout-animations=(), magnetometer=(), microphone=(), midi=(), sync-xhr=(), usb=()";

    location / {
        try_files $uri $uri/ /index.html;
    }
    location ~* (.*)/$ {
        alias /var/www/docs/;
    }
    location ~* ^/CACHE[^/]+/(.*)$ {
        alias /var/www/docs/$1;
        add_header Vary Accept-Encoding;
        etag off;
        expires max;
    }
}
