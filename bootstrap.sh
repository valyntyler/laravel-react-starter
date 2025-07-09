#!/usr/bin/env bash

# fetch dependencies
npm install
composer install

# generate app key
cp .env.example .env
php artisan key:generate

# perform db migration
php artisan make:migration my_migration
php artisan migrate
