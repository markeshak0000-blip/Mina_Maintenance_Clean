const { app, BrowserWindow, Menu, shell, session } = require('electron');
const path = require('path');

const APP_ID = 'com.infinitymen2.minamaintenance';
const APP_NAME = 'Mina Maintenance';

app.setAppUserModelId(APP_ID);
app.name = APP_NAME;

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    show: false,
    backgroundColor: '#050805',
    title: APP_NAME,
    icon: path.join(__dirname, 'build', 'Mina-Maintenance.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true
    }
  });

  win.once('ready-to-show', () => win.show());

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    if (/^https?:\/\//i.test(url)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  win.webContents.on('did-fail-load', (_event, code, description) => {
    console.error(`Renderer load failed: ${code} ${description}`);
  });

  win.loadFile(path.join(__dirname, 'app', 'index.html'));
}

function buildMenu() {
  const template = [
    {
      label: 'ملف',
      submenu: [
        { label: 'طباعة', accelerator: 'Ctrl+P', click: (_item, win) => win?.webContents.print({ silent: false }) },
        { type: 'separator' },
        { role: 'reload', label: 'إعادة تحميل' },
        { role: 'quit', label: 'خروج' }
      ]
    },
    {
      label: 'عرض',
      submenu: [
        { role: 'togglefullscreen', label: 'ملء الشاشة' },
        { role: 'resetzoom', label: 'حجم افتراضي' },
        { role: 'zoomin', label: 'تكبير' },
        { role: 'zoomout', label: 'تصغير' }
      ]
    },
    {
      label: 'مساعدة',
      submenu: [
        { label: `حول ${APP_NAME}`, click: (_item, win) => {
          win?.webContents.executeJavaScript(`alert(${JSON.stringify(`${APP_NAME}\nنظام إدارة مركز صيانة\n\nENG. Mark Eshak | Infinity MEN2\nSoftware Engineer`)});`);
        }}
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
    const allowed = new Set(['media', 'notifications']);
    callback(allowed.has(permission));
  });
  buildMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
