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
    function loadRSVPData(searchQuery = '') {
        const tableBody = document.getElementById('rsvpTableBody');
        if (!tableBody) return;

        let rsvps = JSON.parse(localStorage.getItem('wedding_rsvp')) || [];
        
        // Filter data berdasarkan pencarian jika ada
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            rsvps = rsvps.filter(rsvp => rsvp.name.toLowerCase().includes(query));
        }

        // Bersihkan tabel
        tableBody.innerHTML = '';

        if (rsvps.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">Belum ada data RSVP ditemukan</td></tr>';
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

    // Fungsi global untuk menghapus RSVP
    window.deleteRSVP = function(id) {
        if (confirm('Hapus data RSVP ini?')) {
            let rsvps = JSON.parse(localStorage.getItem('wedding_rsvp')) || [];
            rsvps = rsvps.filter(item => item.id !== id);
            localStorage.setItem('wedding_rsvp', JSON.stringify(rsvps));
            // Trigger refresh dengan query pencarian yang mungkin sedang aktif
            const searchInput = document.querySelector('.search-bar input');
            loadRSVPData(searchInput ? searchInput.value : '');
        }
    };

    // Fitur Pencarian Real-time Otomatis di Dashboard
    const searchInput = document.querySelector('.search-bar input');
    const activityTitle = document.querySelector('.activity-title');
    const activityList = document.querySelector('.activity-list');
    let originalActivityHTML = '';

    if (activityList) {
        originalActivityHTML = activityList.innerHTML;
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            // 1. Terapkan filter ke tabel RSVP jika sedang dibuka
            loadRSVPData(query);

            // 2. Terapkan Pencarian ke UI widget Dashboard (Aktivitas)
            if (query !== '' && activityTitle && activityList) {
                activityTitle.textContent = 'Hasil Pencarian Tamu';
                
                const rsvps = JSON.parse(localStorage.getItem('wedding_rsvp')) || [];
                const filtered = rsvps.filter(rsvp => rsvp.name.toLowerCase().includes(query));

                if (filtered.length > 0) {
                    activityList.innerHTML = '';
                    filtered.forEach(rsvp => {
                        let statusColor = rsvp.presence === 'hadir' ? '#3ecc71' : (rsvp.presence === 'tidak_hadir' ? '#e74c3c' : '#f39c12');
                        let statusText = rsvp.presence === 'hadir' ? 'Hadir' : (rsvp.presence === 'tidak_hadir' ? 'Tidak Hadir' : 'Ragu');
                        
                        activityList.innerHTML += `
                            <div class="activity-item" style="transition: all 0.3s ease;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                                <div class="activity-dot" style="background-color: ${statusColor}; color: white;">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </div>
                                <div class="activity-details">
                                    <h4>${rsvp.name} <span style="font-size: 0.75rem; color: #888; font-weight: normal; margin-left: 5px;">(${statusText})</span></h4>
                                    <p>"${rsvp.wish}"</p>
                                </div>
                                <div class="activity-action" onclick="document.querySelector('[data-target=rsvp]').click()" title="Lihat RSVP">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    activityList.innerHTML = `
                        <div class="activity-item">
                            <div class="activity-dot" style="background-color: #ccc;"></div>
                            <div class="activity-details">
                                <h4>Data tidak ditemukan</h4>
                                <p>Tamu atas nama "${e.target.value}" belum memberikan konfirmasi kehadiran.</p>
                            </div>
                        </div>
                    `;
                }
            } else if (activityTitle && activityList) {
                // Kembalikan ke keadaan semula jika pencarian kosong
                activityTitle.textContent = 'Aktivitas Terkini';
                activityList.innerHTML = originalActivityHTML;
            }
        });
    }

    // Navigasi Pencarian Mobile
    const mobileSearchTrigger = document.getElementById('mobileSearchTrigger');
    if (mobileSearchTrigger && searchInput) {
        mobileSearchTrigger.addEventListener('click', (e) => {
            // Berikan sedikit delay agar transisi tab selesai dulu
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                searchInput.focus();
            }, 50);
        });
    }

    // Muat data saat pertama kali buka
    loadRSVPData();
});
