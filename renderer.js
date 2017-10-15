// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

!function(){
  var checkbox = ('<p>'
    +'<input type="checkbox" id="test5" />'
    +'<label for="test5">Red</label>'
    +'</p>')

  $('#plan').append(checkbox);
}

const remote = require('electron').remote;
const {dialog} = require('electron').remote;
const {BrowserWindow} = require('electron').remote;
var fs = require('fs');

/* Status */
var $focused_ = null;
var isFocus_ = null;
var lastPlanStatus = 3;

/* $elements  */

var dom = ('<div class="input-field col s10">'
    +'<input id="last_name" type="text" class="validate input-element last_input">'
    +'<label for="last_name">予定</label>'
    +'</div>');

var clearIcon = ('<div class="col s2 clear-icon">'
    +'<i class="small material-icons">clear</i>'
    +'</div>');

var doTextareaOrigin = ('<div class="input-field">'
    +'<textarea id="textarea" class="materialize-textarea"></textarea>'
    +'<label for="textarea1"></label>'
    +'</div>');

/****/



/****/

$('#append').on('click',function(){
  var dom = ('<div class="input-field col s10">'
    +'<input id="last_name" type="text" class="validate input-element last_input">'
    +'<label for="last_name">Last Name</label>'
    +'</div>')
  var checkbox = ('<p>'
    +'<input type="checkbox" id="test5" />'
    +'<label for="test5">Red</label>'
    +'</p>')
  $('#plan').append(dom);
  $('#plan').append(checkbox);
  //.trigger('create')
});

$('#plan').on('keydown','.last_input',function(e){
  if(e.keyCode === 13) {
    $('#plan').append(dom);
    $(this).removeClass('last_input');
  }
  });

$(document).on('click',function(e){
  var $targetElement = e.target.parentElement;
  if($($targetElement).hasClass('clear-icon')){
    $($focused_).remove();
    removeCancelIcon();
  }else if(isFocus_ && !$($targetElement).hasClass('input-field')){
    removeCancelIcon();
    return;
  }else if(!isFocus_){
    return;
  }
  });

$('#plan').on('focus','.input-element',function(e){
  if(isFocus_){
    removeCancelIcon()
  }　　　

  var $inputContainer = $(this).parent().parent();
  $($inputContainer).append(clearIcon)
  $focused_ = e.target.parentElement;
  isFocus_ = true;
});


$('#plan').on('blur','.input-element',function(e){
  var value = $(e.target).val();
  if(value !== ""){
    var id = e.targetElement.attr('id');
    var textareaId = id + '-textarea'; 
    var doTextarea = ('<div class="input-field">'
    +'<textarea id="'+textareaId+'" class="materialize-textarea"></textarea>'
    +'<label for="'+textareaId+'">'+textareaId+'</label>'
    +'</div>');
    $('#do').append(doTextarea);
  }
  
});


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


function removeCancelIcon(){
  $('.clear-icon').remove();
  isFocus_ = false;
}

/*
TODO
・バツボタン
・Enterで行追加 -> EventBind
・保存 -> 出力
*/

/*
問題点
blurが先に発火して、キャンセルボタンのイベントが発火しない
blur -> focus-outを観測したい  
*/
