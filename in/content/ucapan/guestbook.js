document.addEventListener("DOMContentLoaded", function () {
    // Kode JavaScript untuk memasukkan kode HTML
    const ucapan = `
    <h3>RSVP</h3>
    <form id="guestbook-form">
        <input type="text" id="nama" placeholder="Nama" required>
        <select id="kehadiran">
            <option value="Hadir" class="status-biru">Hadir</option>
            <option value="Belum Pasti" class="status-hijau">Belum Pasti</option>
            <option value="Tidak Hadir" class="status-merah">Tidak Hadir</option>
        </select>
        <textarea id="pesan" placeholder="Ucapan" required></textarea>
        <button class="gbtn" type="submit"><h6>Kirim</h6></button>
    </form>
    <h4>Ucapan</h4>
    <div id="komentar-list"></div>
        `;
    
document.getElementById('ucapan').innerHTML = ucapan;
})



// Fungsi untuk menampilkan komentar
    function tampilkanKomentar() {
        fetch('https://api.github.com/repos/langowan-project/langowan-project.github.io/issues', {
            method: 'GET',
            headers: {
                'Authorization': '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'
            }
        })
        .then(response => response.json())
        .then(data => {
            const komentarList = document.getElementById("komentar-list");
            komentarList.innerHTML = ""; // Hapus konten sebelumnya

            data.forEach(issue => {
                const komentar = document.createElement("div");
                komentar.classList.add("post");

                const komentarData = JSON.parse(issue.body);

                // Tampilkan timestamp dengan format "dd, NamaBulan yyyy"
                const timestamp = formatTimestamp(komentarData.timestamp);

                komentar.innerHTML = `
                    <section class="post-container">
                        <minidenticon-svg username="${komentarData.nama}"></minidenticon-svg>
                        <div class="post-wrap">
                            <div class="post-item">
                                <h5 class="post-name item">${komentarData.nama}</h5>
                                <h6 class="post-status item"><span class="${komentarData.kehadiran}">${komentarData.kehadiran}</span></h6>
                            </div>
                            <p class="post-comment">${komentarData.pesan}</p>
                            <h6 class="post-date">${timestamp}</h6>
                        </div>
                    </section>
                `;

                komentarList.appendChild(komentar);
            });
        });
    }

    // Panggil fungsi untuk menampilkan komentar saat halaman dimuat
    tampilkanKomentar();

    // Tambahkan event listener untuk mengirim data dan memperbarui komentar saat formulir disubmit
    document.addEventListener("DOMContentLoaded", function() {
        const form = document.getElementById("guestbook-form");

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const nama = document.getElementById("nama").value;
            const pesan = document.getElementById("pesan").value;
            const kehadiran = document.getElementById("kehadiran").value;

            // Gabungkan nama dan timestamp untuk membuat kode unik
            const timestamp = new Date().toISOString();
            const uniqueCode = nama + "-" + timestamp;

            const data = {
                title: `Pesan dari ${nama} - ${timestamp}`,
                body: JSON.stringify({
                    nama: nama,
                    pesan: pesan,
                    kehadiran: kehadiran,
                    timestamp: timestamp,
                    uniqueCode: uniqueCode
                })
            };

            fetch('https://api.github.com/repos/langowan-project/langowan-project.github.io/issues', {
                method: 'POST',
                headers: {
                    'Authorization': 'token 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',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                alert("Pesan berhasil dikirim ke buku tamu!");
                document.getElementById("nama").value = "";
                document.getElementById("pesan").value = "";
                document.getElementById("kehadiran").value = "hadir"; // Reset kehadiran ke default
                tampilkanKomentar();
            })
            .catch(error => {
                alert("Terjadi kesalahan. Silakan coba lagi.");
            });
        });
    });

    // Fungsi untuk memformat timestamp ke "dd, NamaBulan yyyy" dalam bahasa Indonesia
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    }
