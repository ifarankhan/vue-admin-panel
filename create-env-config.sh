#!/bin/sh
WWW_DIR=/usr/share/nginx/html
echo "window._env_ = {" > "${WWW_DIR}/env-config.js"
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' .env >> ${WWW_DIR}/env-config.js
echo "}" >> "${WWW_DIR}/env-config.js"
nginx -g 'daemon off;'