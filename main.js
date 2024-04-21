const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const express = require("express");
const cors = require("cors");

const localServerApp = express();
const PORT = 8088;

let serverInstance;

const startLocalServer = () => {
  localServerApp.use(express.json({ limit: "100mb" }));
  localServerApp.use(cors());
  localServerApp.use(express.static(path.join(__dirname, 'build')));

  return new Promise((resolve, reject) => {
    if (!serverInstance) {
      serverInstance = localServerApp.listen(PORT, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log("Server Started on PORT", PORT);
          resolve();
        }
      });
    } else {
      console.log("Server is already running on PORT", PORT);
      resolve();
    }
  });
};

let mainWindow = null;

const createWindow = async () => {
  if (mainWindow !== null) {
    return;
  }

  if (!serverInstance) {
    await startLocalServer();
  }

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    },
    show: false // Hide the window initially
  });

    win.once('ready-to-show', () => {
    win.maximize()
    win.show(); // Show the window when ready
  })

  win.on('closed', () => {
    mainWindow = null;
  });

  win.loadURL("http://localhost:" + PORT);

  mainWindow = win
};

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
