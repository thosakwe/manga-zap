var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var menubar = require('menubar');

var mb = menubar();

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
mb.on('ready', function ready() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        "min-width": 400, "min-height": 400,
        width: 800, height: 600,
        title: "Manga Zap"
    });

    mainWindow.setMenu(null);
    //mainWindow.openDevTools();

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/read.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});