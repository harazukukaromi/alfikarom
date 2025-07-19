const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const progressBar = document.querySelector('.progress-bar');
const statusDiv = document.getElementById('status');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload.php', true); // Ganti 'upload.php' dengan endpoint server Anda

    xhr.upload.onprogress = (progressEvent) => {
        if (progressEvent.lengthComputable) {
            const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
            progressBar.style.width = percentComplete + '%';
            statusDiv.textContent = Math.round(percentComplete) + '%';
        }
    };

    xhr.onload = () => {
        if (xhr.status === 200) {
            statusDiv.textContent = 'Unggah selesai!';
            // Lakukan sesuatu setelah unggah berhasil
        } else {
            statusDiv.textContent = 'Unggah gagal.';
            // Lakukan sesuatu setelah unggah gagal
        }
    };

    xhr.onerror = () => {
        statusDiv.textContent = 'Unggah gagal.';
        // Lakukan sesuatu setelah unggah gagal
    };

    xhr.send(formData);
});