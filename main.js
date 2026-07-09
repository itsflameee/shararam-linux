const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require('path');

const flashPath = path.join(__dirname, 'plugins', 'libpepflashplayer.so');
app.commandLine.appendSwitch('ppapi-flash-path', flashPath);
app.commandLine.appendSwitch('ppapi-flash-version', '34.0.0.137');
app.commandLine.appendSwitch('no-sandbox');

const SPOOF_USERAGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Shararam/2.0.6 Chrome/80.0.3987.163 Electron/8.5.5 Safari/537.36";

let mainWindow = null;
let tray = null;
let isQuitting = false;

function updateTrayMenu() {
    if (!tray) return;

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Открыть',
            enabled: mainWindow ? !mainWindow.isVisible() : true,
            click: () => {
                if (mainWindow) {
                mainWindow.show();
                } else {
                createWindow();
                }
                                               }
        },
        { type: 'separator' },
        {
            label: 'Выйти',
            click: () => {
                isQuitting = true;
                app.quit();
            }
        }
    ]);

    tray.setContextMenu(contextMenu);
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1320,
        height: 740,
        useContentSize: true,
        icon: path.join(__dirname, 'shararam.png'),
                                   webPreferences: {
                                       nodeIntegration: false,
                                       plugins: true,
                                       contextIsolation: true
                                   }
    });

    mainWindow.webContents.setUserAgent(SPOOF_USERAGENT);

    mainWindow.loadURL('https://www.shararam.ru/game');

    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        const popupWin = new BrowserWindow({
            width: 800,
            height: 600,
            parent: mainWindow,
            icon: path.join(__dirname, 'shararam.png'),
                                           webPreferences: {
                                               plugins: true,
                                               nodeIntegration: false,
                                               contextIsolation: true
                                           }
        });
        popupWin.webContents.setUserAgent(SPOOF_USERAGENT);
        popupWin.loadURL(url);
    });

    mainWindow.setMenu(null);

    mainWindow.on('close', (event) => {
        if (!isQuitting) {
            event.preventDefault();
            mainWindow.hide();
            updateTrayMenu();
        }
        return false;
    });

    mainWindow.on('show', () => {
        updateTrayMenu();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    tray = new Tray(path.join(__dirname, 'shararam.png'));
    tray.setToolTip('Шарарам');

    tray.on('click', () => {
        if (mainWindow) {
            mainWindow.show();
        }
    });

    createWindow();
    updateTrayMenu();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin' && isQuitting) {
        app.quit();
    }
});
