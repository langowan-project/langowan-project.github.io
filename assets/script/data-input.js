// Fungsi untuk membaca file TXT dan memasukkan data ke dalam elemen HTML sesuai dengan ID
function loadDataFromFile() {
    fetch('../../set/data.txt')
        .then(response => response.text())
        .then(data => {
            const dataLines = data.split('\n'); // Memisahkan teks menjadi baris
            dataLines.forEach(line => {
                const [key, value] = line.split(': '); // Memisahkan data berdasarkan ":" sebagai pemisah
                const element = document.getElementById(key.toLowerCase()); // Menyusun ID dari teks kunci
                if (element) {
                    element.textContent = value; // Memasukkan nilai ke elemen yang sesuai
                }
            });
        })
        .catch(error => console.error('Error:', error));
}

// Panggil fungsi loadDataFromFile() saat halaman dimuat
window.addEventListener('load', loadDataFromFile);