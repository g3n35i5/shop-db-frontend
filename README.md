# shop-db-frontend

This repository provides the frontend for shop-db. It can be developed
indepedently from the backend.

## Requirements
* [Node.js](https://nodejs.org/en/download/package-manager/)
* [npm](https://www.npmjs.com/get-npm)
* [Angular CLI](https://angular.io/guide/quickstart)
* [Nginx or a comparable web server](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in
the `dist/` directory. Use the `-prod` flag for a production build.

## Serve

This is an example nginx configuration to serve the shop-db-frontend.
It assumes that the shop-db-frontend repo was cloned to `/var/www`.

```bash
server {
  server_name shop.example.com;
  root /var/www/frontend/dist;

  try_files $uri $uri/ index.html;

  error_log /var/log/nginx/shop-db-frontend.error.log;
  access_log /var/log/nginx/shop-db-frontend.access.log;
}
```
