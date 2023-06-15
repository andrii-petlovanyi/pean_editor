import { app, BrowserWindow } from "electron";
import path from "node:path";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const ELECTRON_DEV_TOOLS = process.env.ELECTRON_DEV_TOOLS === "true";

function createWindow() {
  win = new BrowserWindow({
    width: 920,
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    vibrancy: "under-window",
    visualEffectState: "active",

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),

      devTools: ELECTRON_DEV_TOOLS,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
  win = null;
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
