const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, '../dist/index.html'));

  // Menü tanımı
  const menu = Menu.buildFromTemplate([
    {
      label: 'Dosya',
      submenu: [
        {
          label: 'Verileri İndir (Export)',
          click: () => {
            win.webContents.send('export-data');
          },
        },
        {
          label: 'Verileri Yükle (Import)',
          click: async () => {
            const result = await dialog.showOpenDialog(win, {
              filters: [{ name: 'JSON', extensions: ['json'] }],
              properties: ['openFile']
            });

            if (!result.canceled && result.filePaths.length > 0) {
              const json = fs.readFileSync(result.filePaths[0], 'utf-8');
              win.webContents.send('import-data', json);
            }
          },
        },
        { type: 'separator' },
        { role: 'quit', label: 'Çıkış' },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);

  // Debug için:
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
