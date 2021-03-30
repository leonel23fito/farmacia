const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const mongoose = require('mongoose');
const url = require('url');
const path = require('path');
let electronEjs = require("electron-ejs");
let ejs = new electronEjs({key: __dirname}, {});
mongoose.connect('mongodb://localhost/farmacia', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongo.db");
});
let mainWindow ;
let newProductWindow;

// Reload in Development for Browser Windows
if(process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
  });
}

ipcMain.on('newlog', (event, arg) => {
  console.log(arg) // prints "ping"

  const login = new BrowserWindow({width: 720, height: 600,titleBarStyle: 'customButtonsOnHover' ,webPreferences:{nodeIntegration:true,contextIsolation:false}});
login.setMenu(null);
login.setTitle("Registro de medicamentos");

  login.loadURL(url.format({
    pathname: path.join(__dirname, 'view/login.html'),
    protocol: 'file',
    slashes: true
  }))

  console.log("consola lanzada desde el escucha")
login.toggleDevTools()
})

app.on('error',(err)=>{
console.log(err);


})
app.on('ready', () => {

  // The Main Window
  mainWindow = new BrowserWindow({frame:false, webPreferences:{nodeIntegration:true,contextIsolation:false}});

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'view/template/index.ejs'),
    protocol: 'file',
    slashes: true
  }))
//mainWindow.setFullScreen(true)
 mainWindow.toggleDevTools()

})

ipcMain.on("listarentabla",(event,arg)=>{
  console.log("estoy listando en tabla")
 const farmaco= require(__dirname+"/database/modelos/farmacos")
 
async function datos(){
  const cursor = farmaco.find().cursor();
  console.log("hola")
  let datos=[]
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
  datos.push({name:doc.name, description:doc.description,precioXU:doc.precioXU,cantidaXL:doc.cantidaXL,precioXL:doc.precioXL, fecha_I:doc. fecha_I, fecha_c:doc. fecha_c})}
  mainWindow.webContents.send("listarentabla_main",datos)
   
 
}

  datos()


});
  

 

 ipcMain.on("cargar_farmacos",(event,arg)=>{

  console.log("escuche en el el main que cargue los farmacos")
  mainWindow.webContents.send("cargar_farmacos_main")
 
})
