const copyBtns = document.querySelectorAll('.copybtn');
const copyTexts = document.querySelectorAll('.copytext');

copyBtns.forEach((copyBtn, index) => {
  copyBtn.addEventListener('click', async () => {
    const textToCopy = copyTexts[index].value; // Ambil teks dari elemen input
    try {
      await navigator.clipboard.writeText(textToCopy);
      Swal.fire({
        icon: 'success',
        title: 'Nomor Rekening Sudah di Salin',
        showConfirmButton: false,
        timer: 1000
      });
    } catch (err) {
      console.error('Tidak dapat menyalin teks: ', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyalin',
        showConfirmButton: false,
        timer: 1000
      });
    }
  });
});