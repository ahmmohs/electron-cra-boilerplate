Boilerplate for an electron app that uses React for front end.

## Basic Overview

I've provided an example app that you can efficiently work with in a dev enviroment, and build and package for production. I've also included one example of communication between the ipcRenderer and ipcMain.

### Dependencies

Install all the dependencies
For normal dependencies: `npm install`
For dev dependencies: `npm install --save-dev concurrently wait-on electron electron-builder`

### Dev script

```json
"start-electron": "electron .",
"dev": "concurrently \"SET BROWSER=none&&npm start\" \"wait-on http://localhost:3000 && npm run start-electron\""
```

The line above uses CRA's start script to start the react app and the SET BROWSER=none arguement so that Chrome (or your default browser) does not open automatically, and the wait-on module waits for localhost:3000 to be live before starting the electron app.

### Before packaging

There are three things that you need in your package.json (already in my code, just explaining) before you can package the app.

First:
```json
"homepage": "./"
```
This is required so that the packaged app can find all the required CSS and JS files.

Second:
```json
"author": "ahmmohs"
```

Finally, most importantly:
```json
"build": {
    "appId": "com.github.ahmmohs.electroncra",
    "files": [
      "build/**/*", 
      "node_modules/**/*", 
      "!build-scripts${/*}"
    ],
    "directories": {
      "buildResources": "assets"
    }
  }
```
These are just other things that are required by electron-builder or else it will complain.

### Packaging the app

Finally you can package the app. The first command will be so that you can build the React app. You can either do `npm run build` or `npm run preelectron-pack`. Both do the same thing, and build the React app.

After building the React app you are ready to package the electron app. Run `npm run pack-all` (if you're on Mac) or `npm run pack-win` (if you're on Win). 

The app will get packaged and placed into the `dist` folder. You can go in there and you'll find all the files needed to distribute you're packaged app! :D
