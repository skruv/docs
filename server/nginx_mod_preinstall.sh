#!/bin/bash
# Call NGINX module build scripts and pass error codes to apt hook

# Get NGINX version to upgrade to
read ngfile < <(grep '/nginx_') || exit 0
ngver=$(echo $ngfile | sed 's/-.*//' | sed 's/.*_//')

# List of build scripts to run:
/var/www/docs/server/build_ngx_brotli.sh $ngver || exit $?
# /usr/local/sbin/mkmodsec $ngver || exit $?
# /usr/local/sbin/mkpagespeed $ngver || exit $?
