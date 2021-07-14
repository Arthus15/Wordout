import { VersionController } from './version-controller';
import { app, BrowserWindow, ipcMain } from "electron";
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

function createUpdateWindow() {
    const updaterWindow = new BrowserWindow({
        height: 200,
        width: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        icon: __dirname + '/wordout_icon.png'
    });

    updaterWindow.loadFile(path.join(__dirname, "sections/app-version/update-app.html"));
    updaterWindow.removeMenu();
    updaterWindow.fullScreen = false;
    updaterWindow.webContents.openDevTools();

    return updaterWindow;
}

function initialize_main() {
    createWindow();
    var db = new WordoutDb();

    db.existsAsync().then((result) => {
        if (!result) {
            db.initAsync().then();
        }
    });
}

app.on("ready", async () => {

    console.log('Starting...');

    var versionController = new VersionController();

    var newVersion = await versionController.newVersionAvailableAsync();

    if (true) {
        var updaterWindow = createUpdateWindow();
        ipcMain.on('update-complete', (event, arg) => {
            console.log('Update completed');
            initialize_main();
            updaterWindow.destroy();
        });
    }
    else
        initialize_main();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});