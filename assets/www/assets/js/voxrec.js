var ready = false;
var stopGlobal = false;
var file = false;
function voxRec() {
}

function onDeviceReady() {
  ready = true;
  console.log("Device Ready: " + ready);
}

function doNothing() {

}

function success(entries) {
    var i;
    for (i=0; i<entries.length; i++) {
        console.log(entries[i].name);
    }
}

function fail(error) {
    alert("Failed to open the file system: " + error.code);
}

function record() {
  console.log("record started");
  // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fsSuccess, fail);
  $("#recordbutton").html("<i class=\"icon-spinner icon-spin\"></i> Recording...");
  setAudioPosition("90%")
  var src = "/mnt/sdcard/VoxRec.3gp";
  var mediaRec = new Media(src, mediaSuccess, mediaError);
  mediaRec.startRecord();
  var recTime = 0;
  stopGlobal = false;
  var recInterval = setInterval(function() {
    recTime = recTime + 1;
    //setAudioPosition(recTime * 10 + "%");
    timer(recTime);
    if (recTime >= 480 || stopGlobal == true) {
      clearInterval(recInterval);
      stopGlobal = false;
      mediaRec.stopRecord();
      $("#recordbutton").html("<i class=\"icon-circle\"></i> Record");
      movefile();
      top.location.reload();
    }
  }, 1000);
}

function movefile() {
  window.resolveLocalFileSystemURI("file:///mnt/sdcard/tmprecording.3gp",attemptMove,fail);
}

function moveSuccess(fileEntry){
  alert("Saved to: " + fileEntry.fullPath);
}

function setAudioPosition(position) {
  $("#progressbardiv").width(position);
}

function stop() {
  stopGlobal = true;
}

function timer(recTime) {
  var minutes = Math.floor(recTime / 60);
  var seconds = recTime % 60;
  if (minutes <= 9) {
    minutes = "0" + minutes;
  };
  if (seconds <= 9) {
    seconds = "0" + seconds;
  };


  $("#recordtime").html(minutes + ":" + seconds);
}

function mediaSuccess() {
  console.log("recordAudio():Audio Success");
}

function mediaError(error) {
  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}






function fsSuccess(fileSystem) {
  
}



document.addEventListener("deviceready", onDeviceReady, false);
