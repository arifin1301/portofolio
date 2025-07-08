document.addEventListener('DOMContentLoaded', () => {

    // --- EFEK PARALAKS HEADER ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            header.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });

    // --- ANIMASI KARTU PROYEK ---
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });
    
    // --- LOGIKA SMOOTH SCROLL ---
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        if (link.getAttribute('href') === '#') return;
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- LOGIKA KURSOR KUSTOM (BENTUK KETUPAT) ---
    const cursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button');

    window.addEventListener('mousemove', e => {
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0) rotate(45deg)`;
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('grow');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('grow');
        });
    });
    
    // --- LOGIKA BARU UNTUK NAVIGASI AKTIF ---
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('nav a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 }); // Anggap aktif jika 50% section terlihat

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});