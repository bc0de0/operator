const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getSkills: () => ipcRenderer.invoke('get-skills'),
  generateResponse: (model, prompt) => ipcRenderer.invoke('generate-response', { model, prompt })
});
