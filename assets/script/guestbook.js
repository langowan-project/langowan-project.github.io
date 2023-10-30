const guestbookForm = document.getElementById("guestbook-form");
const guestbookEntries = document.getElementById("guestbook-entries");

async function fetchGuestbookData() {
  const response = await fetch("https://guestbook-7b935-default-rtdb.asia-southeast1.firebasedatabase.app/guestbook.json");
  const data = await response.json();

  if (response.ok) {
    const entries = Object.keys(data)
      .map(key => {
        const entry = data[key];
        const kehadiranClass = {
          "Hadir": "text-blue",
          "Belum Pasti": "text-green",
        }[entry.kehadiran] || "text-red";

        return `
          <section class="guestbook-container">
            <div class="guestbook-wrap">
              <div class="avatar">
                <minidenticon-svg username="${entry.nama}" saturation="50" lightness="75"></minidenticon-svg>
              </div>
              <div class="comments">
                <h3>${entry.nama}</h3>
                <h4><span class="${kehadiranClass}">${entry.kehadiran}</span></h4>
                <p>Ucapan: ${entry.ucapan}</p>
                <h6>${entry.waktu}</h6>
              </div>
            </div>
          </section>
        `;
      })
      .join("");

    guestbookEntries.innerHTML = entries;
  }
}

async function submitGuestbookForm() {
  const formData = new FormData(guestbookForm);
  const data = Object.fromEntries(formData.entries());
  data.waktu = new Date().toLocaleString();

  const response = await fetch("https://guestbook-7b935-default-rtdb.asia-southeast1.firebasedatabase.app/guestbook.json", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const kehadiranClass = {
      "Hadir": "text-blue",
      "Belum Pasti": "text-green",
    }[data.kehadiran] || "text-red";

    guestbookEntries.innerHTML += `
      <section class="guestbook-container">
        <div class="guestbook-wrap">
          <div class="avatar">
            <minidenticon-svg username="${data.nama}" saturation="50" lightness="75"></minidenticon-svg>
          </div>
          <div class="comments">
            <h3>${data.nama}</h3>
            <h4><span class="${kehadiranClass}">${data.kehadiran}</span></h4>
            <p>Ucapan: ${data.ucapan}</p>
            <h6>${data.waktu}</h6>
          </div>
        </div>
      </section>
    `;

    guestbookForm.reset();
  }
}

// Panggil fungsi untuk mengambil data saat halaman dimuat
fetchGuestbookData();

guestbookForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitGuestbookForm();
});