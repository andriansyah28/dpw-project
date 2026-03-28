
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

// Jalankan fungsi saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", startCountdown);