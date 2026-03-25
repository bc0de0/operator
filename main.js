const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    autoHideMenuBar: true,
    backgroundColor: '#ffffff'
  });
  
  win.loadFile('index.html');
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

ipcMain.handle('get-skills', () => {
  const skillsDir = path.join(__dirname, 'skills');
  if (!fs.existsSync(skillsDir)) return [];
  const files = fs.readdirSync(skillsDir).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const content = fs.readFileSync(path.join(skillsDir, file), 'utf-8');
    try {
      return JSON.parse(content);
    } catch(e) {
      console.error('Failed to parse ' + file);
      return null;
    }
  }).filter(Boolean);
});

ipcMain.handle('generate-response', async (event, { model, prompt }) => {
  if (model === 'openai') {
    return await callOpenAI(prompt);
  } else if (model === 'claude') {
    return await callClaude(prompt);
  } else {
    throw new Error('Unsupported model');
  }
});

async function callOpenAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is missing');
  
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }]
    })
  });
  
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.choices[0].message.content;
}

async function callClaude(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is missing');
  
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content[0].text;
}
