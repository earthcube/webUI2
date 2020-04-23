#!/bin/sh

set -e

if [ "$1" = 'httpd' ]; then

    sed -i "s/geodex\.org/${GEODEX_HOST}/g" /usr/local/apache2/htdocs/geocodes/js/gdx/gdxio.js

    httpd-foreground
else
    exec "$@"
fi
