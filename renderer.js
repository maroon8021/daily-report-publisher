// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const $ = jQuery = require('./lib/jquery');
const remote = require('electron').remote;
const {dialog} = require('electron').remote;
const {BrowserWindow} = require('electron').remote;
var fs = require('fs');

$('#console').on('click',function(){
	console.log("Before Fine")
	console.log("Fine")
})

$('#click').on('click',function(){
	var text = $('#textarea').val();
	//fs.writeFile('hoge.txt', text);
	var focusedWindow = BrowserWindow.getFocusedWindow();

	dialog.showSaveDialog(focusedWindow, options,
  // コールバック関数
  function (filename) {
    if (filename) {
      var data = text;
      writeFile(filename, data);
    }
  });
})


var win = remote.getCurrentWindow();
var options = {
  title: 'タイトル',
  defaultPath: '.',
  filters: [
    { name: 'ドキュメント', extensions: ['txt', 'text']},
    { name: 'All Files', extensions: ['*'] }
  ],
  properties: ['openFile', 'createDirectory']
};


function writeFile(path, data) {
  fs.writeFile(path, data, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  });
}


console.log("Here is debug")