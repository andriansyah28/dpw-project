document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('[data-target]');
    const contentViews = document.querySelectorAll('.content-view');
    const pageTitle = document.querySelector('.page-title');

    // Tab Switching Logic
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if (!targetId) return;

            e.preventDefault();


            // Update Active Link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update Active View
            contentViews.forEach(view => {
                view.classList.remove('active');
                if (view.id === targetId) {
                    view.classList.add('active');
                }
            });

            // Update Page Title based on target
            updatePageTitle(targetId);
        });
    });

    function updatePageTitle(id) {
        switch(id) {
            case 'dashboard':
                pageTitle.textContent = 'Admin Dashboard';
                break;
            case 'rsvp':
                pageTitle.textContent = 'Manajemen RSVP';
                loadRSVPData(); // Load data saat masuk ke tab RSVP
                break;
            case 'tamu':
                pageTitle.textContent = 'Daftar Tamu';
                break;
            case 'pengaturan':
                pageTitle.textContent = 'Pengaturan Sistem';
                break;
            default:
                pageTitle.textContent = 'Admin Dashboard';
        }
    }

    // Fungsi untuk memuat data RSVP dari localStorage
    function loadRSVPData() {
        const tableBody = document.getElementById('rsvpTableBody');
        if (!tableBody) return;

        const rsvps = JSON.parse(localStorage.getItem('wedding_rsvp')) || [];
        
        // Bersihkan tabel
        tableBody.innerHTML = '';

        if (rsvps.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">Belum ada data RSVP</td></tr>';
            return;
        }

        // Render data secara terbalik (terbaru di atas)
        rsvps.reverse().forEach(rsvp => {
            const row = document.createElement('tr');
            
            // Tentukan kelas badge berdasarkan status kehadiran
            let badgeClass = 'badge-success';
            let presenceLabel = 'Hadir';
            
            if (rsvp.presence === 'tidak_hadir') {
                badgeClass = 'badge-warning';
                presenceLabel = 'Tidak Hadir';
            } else if (rsvp.presence === 'ragu') {
                badgeClass = 'badge-outline';
                presenceLabel = 'Ragu';
            }

            row.innerHTML = `
                <td><strong>${rsvp.name}</strong></td>
                <td><span class="badge ${badgeClass}">${presenceLabel}</span></td>
                <td>1 Orang</td>
                <td>"${rsvp.wish}"</td>
                <td class="table-actions">
                    <button class="btn-icon" title="Hapus" onclick="deleteRSVP(${rsvp.id})">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                    <small style="display:block; color:#999; font-size:10px;">${rsvp.date}</small>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Fungsi global untuk menghapus RSVP (perlu diekspos ke window agar bisa dipanggil dari HTML string)
    window.deleteRSVP = function(id) {
        if (confirm('Hapus data RSVP ini?')) {
            let rsvps = JSON.parse(localStorage.getItem('wedding_rsvp')) || [];
            rsvps = rsvps.filter(item => item.id !== id);
            localStorage.setItem('wedding_rsvp', JSON.stringify(rsvps));
            loadRSVPData(); // Refresh tabel
        }
    };

    // Muat data saat pertama kali buka jika tab RSVP aktif
    loadRSVPData();
});
