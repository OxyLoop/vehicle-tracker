const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onExport: (callback) => ipcRenderer.on('export-data', callback),
  onImport: (callback) => ipcRenderer.on('import-data', (event, data) => {
    callback(data);
  }),
});
