### Requirements

* Tested on Node 5.3.0 (maybe other versions too)

### Developer setup

1. Install node
  1. Install node version manager (nvm) from [instructions](https://github.com/creationix/nvm)
  1. `nvm install 5.3` (install node with nvm)
1. In project directory, run the following:
  1. `npm install` (Download dependencies)
  1. `npm run dev` (run development server on localhost)
  1.  Open browser to view
  1. `npm run eslint` (to validate source code **before committing**)

### Production installation

1. Install node
  1. Install node version manager (nvm) from [instructions](https://github.com/creationix/nvm)
  1. `nvm install 5.3` (install node with nvm)
1. In project directory, run the following:
  1. `npm install` (Download dependencies)
  1. `npm run build` (build project `/dist` output directory)
  1. Edit `config.js` and set variables
1. To run project, we should use `pm2` or similar node process manager
  1. `npm install pm2 --global` (install `pm2`)
  1.  `pm2 start server/server.js` (Start, Daemonize and auto restart application)
