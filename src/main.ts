import { app, BrowserWindow } from "electron";
import * as path from "path";

function createWindow() {
    const mainWindow = new BrowserWindow({
        height: 800,
        width: 600,
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
    mainWindow.removeMenu();
    mainWindow.fullScreen = true;

    mainWindow.webContents.openDevTools();
}

app.on("ready", () => {
    createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});