#!/bin/bash
npm run build
rm -rf phonegap/www/static/css
rm -rf phonegap/www/static/js
cp -r dist/* phonegap/www