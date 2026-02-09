/* ================= MENU TOGGLE ================= */
const toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

if (toggle && sidebar) {
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    // Toggle menu on button click
    toggle.addEventListener('click', () => {
        const isActive = sidebar.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isActive);
    });

    // Close menu when clicking on a link (mobile)
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close menu when clicking outside (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                sidebar.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    });
}

/* ================= IMAGE ZOOM MODAL (INDEX PAGE) ================= */
const modal = document.querySelector('.image-modal');
const slides = document.querySelectorAll('.slide');

if (modal && slides.length > 0) {
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.close-modal');

    // Open modal on image click
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            modal.classList.add('active');
            modalImg.src = slide.src;
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal on X button click
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

/* ================= WORKS PAGE - SCROLL REVEAL ================= */
const workItems = document.querySelectorAll('.work-item');
const scrollIndicator = document.querySelector('.scroll-indicator');

if (workItems.length > 0) {
    // Intersection Observer for scroll reveal
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    workItems.forEach(item => {
        observer.observe(item);
    });

    // Hide scroll indicator after scrolling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollIndicator) {
            clearTimeout(scrollTimeout);
            scrollIndicator.style.opacity = '0';
            
            scrollTimeout = setTimeout(() => {
                if (window.scrollY < 100) {
                    scrollIndicator.style.opacity = '0.7';
                }
            }, 1000);
        }
    });

    // Hide scroll indicator on first scroll
    let hasScrolled = false;
    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 50 && scrollIndicator) {
            hasScrolled = true;
            scrollIndicator.style.transition = 'opacity 0.5s ease';
            scrollIndicator.style.opacity = '0';
            setTimeout(() => {
                scrollIndicator.style.display = 'none';
            }, 500);
        }
    });
}

/* ================= GSAP ANIMATIONS ================= */
// Check if GSAP is loaded
if (typeof gsap !== 'undefined') {
    
    // Index page - Animate slides
    if (slides.length > 0) {
        gsap.from('.slide', {
            y: 30,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out'
        });
    }

    // CV page - Animate CV blocks
    const cvBlocks = document.querySelectorAll('.cv-block');
    if (cvBlocks.length > 0) {
        gsap.fromTo('.cv-block', 
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out',
                delay: 0.2
            }
        );

        // Animate CV header
        gsap.from('.cv-header', {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: 'power2.out'
        });
    }

    // CV Image page - Animate fullscreen image
    const cvFullscreenImage = document.querySelector('.cv-fullscreen-image');
    if (cvFullscreenImage) {
        gsap.to('.cv-fullscreen-image', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 0.3
        });
    }

    // Works page - Animate header
    const worksHeader = document.querySelector('.works-header');
    if (worksHeader) {
        gsap.from('.works-header', {
            opacity: 0,
            y: -30,
            duration: 1,
            ease: 'power2.out'
        });

        // Animate scroll indicator
        if (scrollIndicator) {
            gsap.from('.scroll-indicator', {
                opacity: 0,
                y: -20,
                duration: 1,
                delay: 0.5,
                ease: 'power2.out'
            });
        }
    }

    // Animate sidebar on all pages
    if (sidebar) {
        gsap.from('.sidebar', {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    }
}