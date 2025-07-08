document.addEventListener('DOMContentLoaded', () => {

    // --- EFEK PARALAKS HEADER ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            header.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
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

    // --- LOGIKA PROJECT SECTION INTERAKTIF ---
    const projectItems = document.querySelectorAll('.project-item');
    const projectImages = document.querySelectorAll('.preview-img');

    if (projectItems.length > 0 && projectImages.length > 0) {
        const projectObserverOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const projectObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    projectImages.forEach(img => img.classList.remove('active'));
                    const imageId = entry.target.getAttribute('data-image');
                    const imageToShow = document.getElementById(`img-${imageId}`);
                    if (imageToShow) {
                        imageToShow.classList.add('active');
                    }
                }
            });
        }, projectObserverOptions);

        projectItems.forEach(item => {
            projectObserver.observe(item);
        });
    }

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
    
    // --- LOGIKA NAVIGASI AKTIF ---
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('nav a');

    if (sections.length > 0 && navLinks.length > 0) {
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
        }, { threshold: 0.5 });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
});