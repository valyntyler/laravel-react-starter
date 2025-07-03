## Laravel-React Starter

This project uses the following libraries:

- `inertia.js` for client-server routing
- `zod` and `lodash` for client-side validation
- `shadcn-ui` (based on radix-ui) for pretty UI components
- `react-hook-form` for... well, you can probably guess that for yourself

## Usage

- Run `npm install` and `composer install` to initialize all of your project's
  dependencies.
- Copy the `.env.example` file to a new `.env` file. That's your project's
  runtime environment.
- Run `php artisan key:generate` to populate your `.env` with a unique app key.
- Create a MySQL database and privileged user, then update your `DB_DATABASE`,
  `DB_USERNAME` and `DB_PASSWORD` variables accordingly.
- Run `php artisan make:migration` and `php artisan migrate` to sync your
  database to the project.

Start the Vite "build-watch-serve" pipeline with `npm run watch` and run your
PHP server with `php artisan serve`. For production, use `npm run build`, and
either run `php artisan serve` or serve your app with your preffered method with
your document root set to `public/index.php`.

### For `nix` users (credits: [valyntyler](https://github.com/valyntyler)):

You can enter a dev shell with `nix develop .#default` (or have it done
automatically w/ [direnv <3](https://direnv.net/))

Then make sure to init all dependecies:

```sh
npm i
composer i
```

Finally, start the Vite "build-watch-serve" pipeline with `npm run watch`. For
production, use `npm run build`, and either run `php artisan serve` or serve
your app with your preffered method with your document root set to
`public/index.php`.

```sh
nix run .#default
```

OR

```bash
npm run build; php artisan serve
```

Bonus: use `zellij --layout layout.kdl` to open debug deployment environment

## Tips

- Don't use hard-coded URLs for routes, you monster.
- Use `react-hook-form`'s form controller instead of the one provided by
  `inertia.js`. Just use `Inertia.router.post()` for form submission, since
  `react-hook-form` already handles validation through `zod`.
- Name your routes based on your controller methods. Name your controller
  methods following Laravel conventions.
- Keep the file structure. 'Partials' go in `Partials/` subdirectories for their
  respective pages. <sub>twig templates have brainwashed me</sub>
- Try extending `Request` instead of using the generic request class. Developing
  a backend-first app is the first step to keeping your sanity in check.
- Create database migrations with every entity LOC edited. You'll thank me
  later.
- Never-nest. Never-test. Keep your code clean and **never test it**. What, are
  you doubting your skills as a dev? Is that _impostor syndrome_ I smell? Weak.

## License

_i dont really care man just clone this i wont sue you_
