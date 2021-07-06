import { VersionController } from './version-controller';
import { app, BrowserWindow } from "electron";
import * as path from "path";
import { WordoutDb } from "./database";

function createWindow() {
    const mainWindow = new BrowserWindow({
        height: 800,
        width: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        icon: __dirname + '/wordout_icon.png'
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
    mainWindow.removeMenu();
    mainWindow.fullScreen = false;

    //mainWindow.webContents.openDevTools();
}

app.on("ready", async () => {

    console.log('Activating app');

    var versionController = new VersionController();

    var newVersion = await versionController.newVersionAvailableAsync();

    if (newVersion) {
        console.log('New version detected, updating...');
        await versionController.executeUpdateAsync();
        console.log('Update complete successfully');
    }

    createWindow();
    var db = new WordoutDb();

    db.existsAsync().then((result) => {
        if (!result) {
            db.initAsync().then();
        }
    });

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