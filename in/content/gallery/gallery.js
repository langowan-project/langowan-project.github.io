document.addEventListener("DOMContentLoaded", function () {
  // Kode JavaScript untuk memasukkan kode HTML
  const thumbnails = `
    <img class="bottom" src="../in/assets/gallery/001.webp" onclick="openModal('../in/assets/gallery/001.webp')">
    <img class="bottom" src="../in/assets/gallery/002.webp" onclick="openModal('../in/assets/gallery/002.webp')">
    <img class="bottom" src="../in/assets/gallery/003.webp" onclick="openModal('../in/assets/gallery/003.webp')">
    <img class="bottom" src="../in/assets/gallery/004.webp" onclick="openModal('../in/assets/gallery/004.webp')">
    <img class="bottom" src="../in/assets/gallery/005.webp" onclick="openModal('../in/assets/gallery/005.webp')">
    <img class="bottom" src="../in/assets/gallery/006.webp" onclick="openModal('../in/assets/gallery/006.webp')">
    <img class="bottom" src="../in/assets/gallery/007.webp" onclick="openModal('../in/assets/gallery/007.webp')">
    <img class="bottom" src="../in/assets/gallery/008.webp" onclick="openModal('../in/assets/gallery/008.webp')">
    <!-- Tambahkan gambar lainnya di sini -->
    <div class="card-container">
      <div class="card-wrap">
        <div class="card">
        <h4>Our Video</h4>
        <video width="100%" height="auto" controls>
          <source src="../in/assets/video.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        </div>
      </div>
    </div>
  `;
    
  document.getElementById('thumbnails').innerHTML = thumbnails});

let modal = document.getElementById("myModal");
let modalImg = document.getElementById("modalImg");
let closeBtn = document.getElementById("closeBtn");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let currentImageIndex = 0;
const totalImages = 8;

function openModal(imageUrl) {
  modal.style.display = "block";
  modalImg.src = imageUrl;
  document.body.style.overflow = "hidden";
}

closeBtn.onclick = function () {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

prevBtn.onclick = function () {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = totalImages - 1; // Kembali ke foto terakhir
  }
  modalImg.src = `../in/assets/gallery/00${currentImageIndex + 1}.webp`;
}

nextBtn.onclick = function () {
  currentImageIndex++;
  if (currentImageIndex >= totalImages) {
    currentImageIndex = 0; // Kembali ke foto pertama
  }
  modalImg.src = `../in/assets/gallery/00${currentImageIndex + 1}.webp`;
}

// Fungsi slide mobile
let touchStartX = 0;
let touchEndX = 0;

modalImg.addEventListener("touchstart", function (e) {
  touchStartX = e.touches[0].clientX;
});

modalImg.addEventListener("touchend", function (e) {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;

  if (touchStartX - touchEndX > swipeThreshold) {
    nextBtn.click();
  } else if (touchEndX - touchStartX > swipeThreshold) {
    prevBtn.click();
  }
}
