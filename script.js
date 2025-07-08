document.addEventListener('DOMContentLoaded', () => {

    // Efek paralaks sederhana pada header saat scroll
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        header.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    });

    // Animasi sederhana untuk kartu proyek saat muncul di layar
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Smooth scroll untuk link indikator
    const scrollLink = document.querySelector('.scroll-down-indicator');

    if (scrollLink) {
        scrollLink.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah lompatan instan
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Efek scroll halus
                    block: 'start'
                });
            }
        });
    }
});