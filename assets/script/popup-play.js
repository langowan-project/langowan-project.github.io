/*==================== POPUP & PLAY BUTTON (Javascript) ====================*/
var track = new Audio("../../set/audio/music.mp3");

var controlBtn = document.getElementById('play-pause');

function playPause() {
    if (track.paused) {
        track.play();
        //controlBtn.textContent = "Pause";
        controlBtn.className = "pause";
    } else { 
        track.pause();
         //controlBtn.textContent = "Play";
        controlBtn.className = "play";
    }
}

controlBtn.addEventListener("click", playPause);
track.addEventListener("ended", function() {
  controlBtn.className = "pause";
});

document.querySelector(".close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
    track.play();
    var targetElemen = document.getElementById("home");
    targetElemen.scrollIntoView();
});


