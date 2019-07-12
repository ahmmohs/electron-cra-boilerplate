const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

/**
 * createWindow - Creates the initial browser window for the app.
 * @return {null}
 */
function createWindow() {

    // create the browser window, with the specified settings/options
    // learn more about BrowserWindow in official electron api
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            preload: __dirname + '/preload.js'
        },
        frame: true,
        show: false
    });

    // set the view for the window, by either going to localhost:3000
    // or if in production, grabbing the build file
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    
    // once the window is ready show it
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    // when renderer sends closeApp to to main, exit the process.
    ipcMain.on('closeApp', e => {
        console.log('Got called to close the app')
        e.preventDefault();
        process.exit();
    });

}

// once electron app is ready, createWindow
app.on('ready', createWindow);