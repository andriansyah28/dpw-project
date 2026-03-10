// Set Target: 9 September 2026 Jam 08:00
const target = new Date("2026-09-09T08:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const gap = target - now;

    if (gap > 0) {
        // Konversi Waktu
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        // Update ke HTML
        document.getElementById("days").innerText = d < 10 ? "0" + d : d;
        document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
        document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
        document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
    } else {
        // Jika waktu terlewati
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
    }
};

setInterval(updateCountdown, 1000);

updateCountdown();