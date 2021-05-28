# Cocktails World ![Build](https://github.com/lauriharpf/cocktails/actions/workflows/node.js.yml/badge.svg) [![License](https://img.shields.io/github/license/lharpf/cocktails)](https://github.com/lauriharpf/cocktails/blob/master/LICENSE.txt)

[Cocktails World](http://www.cocktailsworld.eu/) shows cocktail recipes and calculates needed ingredients based on selected cocktails. Built with React, Redux, Bootstrap and hosted in Heroku.

![Animated demo of Cocktails World site](https://raw.githubusercontent.com/lauriharpf/cocktails/master/readme_demo.gif)

# Development

Based on the [create-react-app with a Node server on Heroku](https://github.com/mars/heroku-cra-node) template, relevant sections of the README below.

## Deploy to Heroku

```bash
git clone https://github.com/lauriharpf/cocktails
cd cocktails
heroku create
git push heroku master
```

This deployment will automatically:

- detect [Node buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)
- build the app with
  - `npm install` for the Node server
  - `npm run build` for create-react-app
- launch the web process with `npm start`
  - serves `../react-ui/build/` as static files
  - customize by adding API, proxy, or route handlers/redirectors

Changes to dependencies in package.json take effect when the file is saved.

## Runtime Config

create-react-app itself supports [configuration with environment variables](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables). These compile-time variables are embedded in the bundle during the build process, and may go stale when the app slug is promoted through a pipeline or otherwise changed without a rebuild. See create-react-app-buildpack's docs for further elaboration of [compile-time vs runtime variables](https://github.com/mars/create-react-app-buildpack/blob/master/README.md#user-content-compile-time-vs-runtime).

[create-react-app-buildpack's runtime config](https://github.com/mars/create-react-app-buildpack/blob/master/README.md#user-content-runtime-configuration) makes it possible to dynamically change variables, no rebuild required. That runtime config technique may be applied to Node.js based apps such as this one.

1. Add the inner buildpack to your app, so that the `heroku/nodejs` buildpack is last:

   ```bash
   heroku buildpacks:add -i 1 https://github.com/mars/create-react-app-inner-buildpack

   # Verify that create-react-app-inner-buildpack comes before nodejs
   heroku buildpacks
   ```

2. Set the bundle location for runtime config injection:

   ```bash
   heroku config:set JS_RUNTIME_TARGET_BUNDLE='/app/react-ui/build/static/js/*.js'
   ```

3. Now, build the app with this new setup:

   ```bash
   git commit --allow-empty -m 'Enable runtime config with create-react-app-inner-buildpack'
   git push heroku master
   ```

## Local Development

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`
1. **React UI** in `react-ui/` directory.

### Run the API server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for Node

```bash
npm install package-name --save
```

### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](react-ui/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for React UI

```bash
# Always change directory, first
cd react-ui/

npm install package-name --save
```
