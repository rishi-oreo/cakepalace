document.addEventListener("DOMContentLoaded", function () {
    // Section reveal on scroll
    const sections = document.querySelectorAll('.animate-section');
    const revealOnScroll = () => {
        const trigger = window.innerHeight * 0.85;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < trigger) {
                section.classList.add('visible');
            }
        });
    };
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', function () {
        const isOpen = document.body.classList.toggle('menu-open');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu on nav link click (mobile)
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function () {
            document.body.classList.remove('menu-open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.main-nav a[href^="#"], .btn-primary').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Cake price sections
    const sectionBtns = document.querySelectorAll('.cake-section-btn');
    const grid = document.querySelector('.cakes-grid'); // <-- Make sure this is defined!
    if (sectionBtns.length && grid) {
        sectionBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                sectionBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const section = this.getAttribute('data-section');
                Array.from(grid.children).forEach(card => {
                    const price = parseInt(card.querySelector('.price')?.textContent.replace(/[^\d]/g, '') || 0, 10);
                    card.style.display = (
                        section === 'all' ||
                        (section === 'low' && price >= 600 && price <= 900) ||
                        (section === 'mid' && price >= 901 && price <= 1100) ||
                        (section === 'high' && price >= 1101)
                    ) ? '' : 'none';
                });
            });
        });
        // Set "All" as active by default
        sectionBtns[0].classList.add('active');
    }
});