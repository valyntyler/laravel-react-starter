#!/usr/bin/env bash

# fetch dependencies
npm install
composer install

# generate app key
cp .env.example .env
php artisan key:generate
