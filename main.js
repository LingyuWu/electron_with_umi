const { app, BrowserWindow } = require('electron');
const path = require("path");
let mainWindow;

function createWindow() {  //创建一个新窗口
  mainWindow = new BrowserWindow({
    width: "500px",  //窗口长度
    height: "400px",	//窗口款度
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true,
      webSecurity: false,
      preload: path.join(__dirname, './renderer.js')
    }
  });
  mainWindow.maximize();	//窗口最大化
  mainWindow.on('closed', function () {	//窗口关闭方法
    mainWindow = null
  });
  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);	//窗口主文件地址

  mainWindow.webContents.openDevTools();
}

//以下就是类似于app的生命周期的方法
app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const ipc = require('electron').ipcMain;
ipc.on('ping', (event, arg) => {
  event.sender.send('ping-reply', 'pong');
});
