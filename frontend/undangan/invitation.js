
// Fungsi untuk menjalankan hitungan mundur
function startCountdown() {
    // Atur tanggal tujuan: 9 September 2026 jam 08:00 pagi
    const targetDate = new Date("September 9, 2026 08:00:00").getTime();

    // Perbarui hitungan mundur setiap 1 detik
    const timerInterval = setInterval(function() {

        // Dapatkan waktu sekarang
        const now = new Date().getTime();

        // Hitung selisih antara sekarang dan tanggal tujuan
        const distance = targetDate - now;

        // Perhitungan waktu untuk hari, jam, menit, dan detik
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Pastikan elemen ada di halaman sebelum diisi (menghindari error console)
        if (document.getElementById("days")) {
            document.getElementById("days").innerHTML = days;
            document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
        }

        // Jika waktu sudah habis
        if (distance < 0) {
            clearInterval(timerInterval);
            const container = document.querySelector(".timer-container");
            if (container) {
                container.innerHTML = "<h2 style='color:#5d4332; font-family:Poppins;'>ACARA SEDANG BERLANGSUNG</h2>";
            }
        }
    }, 1000);
}


// Fungsi untuk toggle navbar (sembunyi/tampil)
function setupNavbarToggle() {
    const navbar = document.getElementById('mainNavbar');
    const closeBtn = document.getElementById('navbarToggle');
    const openBtn = document.getElementById('menuLauncher');

    if (navbar && closeBtn && openBtn) {
        // Klik tombol X (Close) -> Sembunyikan navbar
        closeBtn.addEventListener('click', () => {
            navbar.classList.add('minimized');
        });

        // Klik tombol Hamburger (Open) -> Tampilkan navbar
        openBtn.addEventListener('click', () => {
            navbar.classList.remove('minimized');
        });
    }
}

// Fungsi untuk mengelola Modal Ucapan & RSVP
function setupWishesModal() {
    const modal = document.getElementById('wishesModal');
    const openBtn = document.querySelector('.btn-confirm');
    const closeBtn = document.getElementById('closeModal');
    const wishesForm = document.getElementById('wishesForm');
    const successMessage = document.getElementById('successMessage');
    const btnOk = document.getElementById('btnOk');

    if (modal && openBtn && closeBtn) {
        // Buka Modal
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
            // Reset form dan pesan sukses saat dibuka kembali
            if (wishesForm) wishesForm.style.display = 'block';
            if (successMessage) successMessage.style.display = 'none';
        });

        // Tutup Modal (Tombol X)
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Tutup Modal (Klik di luar konten)
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Tangani Submit Form
        if (wishesForm) {
            wishesForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Ambil data dari input
                const nameInput = document.getElementById('guestName');
                const presenceInput = document.getElementById('presenceStatus');
                const wishInput = document.getElementById('guestWish');

                const newRSVP = {
                    id: Date.now(),
                    name: nameInput ? nameInput.value : 'Anonim',
                    presence: presenceInput ? presenceInput.value : 'hadir',
                    wish: wishInput ? wishInput.value : '',
                    date: new Date().toLocaleString('id-ID')
                };

                // Simpan ke localStorage
                let existingRSVPs = JSON.parse(localStorage.getItem('wedding_rsvp')) || [];
                existingRSVPs.push(newRSVP);
                localStorage.setItem('wedding_rsvp', JSON.stringify(existingRSVPs));

                console.log("RSVP Tersimpan:", newRSVP);

                // Tampilkan pesan sukses
                wishesForm.style.display = 'none';
                if (successMessage) successMessage.style.display = 'block';
            });
        }

        // Tutup setelah OK
        if (btnOk) {
            btnOk.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }
    }
}

// Jalankan fungsi saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    startCountdown();
    setupNavbarToggle();
    setupWishesModal();
});