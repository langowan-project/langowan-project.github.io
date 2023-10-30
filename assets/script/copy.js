const copyBtns = document.querySelectorAll('.copybtn');
const copyTexts = document.querySelectorAll('.copytext');

copyBtns.forEach((copyBtn, index) => {
  copyBtn.addEventListener('click', () => {
    const textToCopy = copyTexts[index];
    textToCopy.select(); // Selects the text inside the input
    document.execCommand('copy'); // Simply copies the selected text to clipboard
    Swal.fire({
      icon: 'success',
      title: 'Nomor Rekening Sudah di Salin',
      showConfirmButton: false,
      timer: 1000
    });
  });
});