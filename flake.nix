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
          # Dev dependencies
          buildInputs = with pkgs; [
            laravel
            nodejs
            php
            podman
            podman-compose
            phpPackages.composer
            typescript
          ];
        };

        packages = rec {
          build = pkgs.writeShellScriptBin "build" "npm run build";
          serve = pkgs.writeShellScriptBin "serve" "php artisan serve";
          default = pkgs.writeShellScriptBin "default" ''
            ${build}/bin/build
            ${serve}/bin/serve
          '';
        };
      }
    );
}
