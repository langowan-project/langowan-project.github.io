document.addEventListener("DOMContentLoaded", function () {
    // Kode JavaScript untuk memasukkan kode HTML
    const navbar = `
    <nav>
        <ul>
            <li>
                <a class="nav-icon active" href="#home">1</a>
                <a class="nav-icon" href="#profil">2</a>
                <a class="nav-icon" href="#acara">3</a>
                <a class="nav-icon" href="#galeri">4</a>
                <a class="nav-icon" href="#cerita">5</a>
                <a class="nav-icon" href="#gift">6</a>
                <a class="nav-icon" href="#ucapan">7</a>
                <span id="play-pause" class="pause"></span>
            </li>
        </ul>
    </nav>
    `;
    
    document.getElementById('navbar').innerHTML = navbar;

let article = document.querySelectorAll("article");
let list = document
  .querySelectorAll("li a");

window.onscroll = () => {
  article.forEach((i) => {
    let top = window.scrollY;
    let offset = i.offsetTop - 150;
    let height = i.offsetHeight;
    let id = i.getAttribute("id");

    if (top >= offset && top < offset + height) {
      list.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector("li a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};
    
    const track = new Audio("../in/navbar/music.mp3");
    const controlBtn = document.getElementById('play-pause');
    
    function togglePlayPause() {
        if (track.paused) {
            track.play();
            controlBtn.className = "pause";
        } else {
            track.pause();
            controlBtn.className = "play";
        }
    }
    
    function closePopup() {
        document.querySelector(".popup").style.display = "none";
        track.play();
        document.body.scrollIntoView();
    }
    
    controlBtn.addEventListener("click", togglePlayPause);
    
    track.addEventListener("ended", () => {
        controlBtn.className = "pause";
    });
    
    document.querySelector(".close").addEventListener("click", closePopup);
  });