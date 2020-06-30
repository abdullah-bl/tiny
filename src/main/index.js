'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
    // titleBarStyle: 'hidden',
    backgroundColor: '#000000c0',
    transparent: true,
    show: false,
    minWidth: 800,
    minHeight: 570,
    width: 1000,
    height: 500,
    frame: false,
    webPreferences: { nodeIntegration: true }
  })

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  if (isDevelopment) {
    window.menuBarVisible = false
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    window.menuBarVisible = false
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  // on ready show 
  window.on('ready-to-show', () => window.show())

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', async () => {
  mainWindow = createMainWindow()
})
