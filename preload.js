const { contextBridge, shell } = require('electron');

contextBridge.exposeInMainWorld('desktopApp', {
  name: 'Mina Maintenance',
  version: '7.0.0',
  developer: 'ENG. Mark Eshak | Infinity MEN2',
  openExternal: (url) => {
    if (typeof url === 'string' && /^https?:\/\//i.test(url)) {
      return shell.openExternal(url);
    }
    return Promise.resolve(false);
  }
});
