document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
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
});
