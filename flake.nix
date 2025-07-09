{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            docker
            laravel
            nodejs
            php
            phpPackages.composer
            typescript
          ];
          DB_CONNECTION = "mysql";
          DB_HOST = "127.0.0.1";
          DB_PORT = "3306";
          DB_DATABASE = "mydatabase";
          DB_USERNAME = "root";
          DB_PASSWORD = "mypassword";
        };
        packages.default = pkgs.writeShellScriptBin "start" ''
          npm run build
          php artisan serve
        '';
      }
    );
}
