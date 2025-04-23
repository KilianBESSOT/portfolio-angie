/**
 * Portfolio Angéline Allibert - Gestion de Patrimoine
 * Script principal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        loader.classList.add('hidden');
    }, 1500);

    // Navigation
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelectorAll('.navbar-links a');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navbarToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('.navbar-menu').classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarToggle.classList.remove('active');
            document.querySelector('.navbar-menu').classList.remove('active');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navbarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Initialize GSAP animations
    initGSAPAnimations();

    // Form validation and submission with Formspree
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                e.preventDefault(); // Empêcher l'envoi si la validation échoue
                alert('Veuillez remplir tous les champs obligatoires.');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault(); // Empêcher l'envoi si la validation échoue
                alert('Veuillez entrer une adresse email valide.');
                return false;
            }
            
            // Si la validation réussit, le formulaire sera soumis à Formspree
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitButton.disabled = true;
            
            // Pour le développement local, nous pouvons simuler l'envoi
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                // En mode développement local
                e.preventDefault(); // Empêcher l'envoi réel en local
                
                // Simuler un délai d'envoi
                setTimeout(function() {
                    alert('Mode local : Le message serait envoyé en production. Formspree nécessite que le site soit en ligne pour fonctionner complètement.');
                    submitButton.innerHTML = 'Envoyer';
                    submitButton.disabled = false;
                    contactForm.reset();
                }, 1500);
                
                return false;
            }
            
            // En production (site en ligne sur GitHub Pages)
            // Formspree se chargera de l'envoi du formulaire via l'endpoint https://formspree.io/f/xblojlka
            // L'utilisateur sera redirigé vers https://kilianbessot.github.io/portfolio-angie/ après l'envoi
        });
    }
});

/**
 * Initialize GSAP animations
 */
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.from('.hero-text h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1.7
    });
    
    gsap.from('.hero-text h2', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1.9
    });
    
    gsap.from('.hero-text p', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 2.1
    });
    
    gsap.from('.hero-cta', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 2.3
    });
    
    gsap.from('.hero-image', {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 2
    });
    
    // Section headers animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
    
    // About section animations
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-image',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -50,
        duration: 1
    });
    
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 50,
        duration: 1
    });
    
    // Timeline animations
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 1,
            delay: i * 0.2
        });
    });
    
    // Skills animations
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1
        });
    });
    
    // Animate skill bars
    gsap.utils.toArray('.skill-progress').forEach((bar) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        tl.fromTo(bar, 
            { width: '0%' }, 
            { width: bar.style.width, duration: 1.5, ease: 'power2.out' }
        );
    });
    
    // Approach animations
    gsap.utils.toArray('.approach-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1
        });
    });
    
    // Methodology steps animations
    gsap.utils.toArray('.step').forEach((step, i) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: i % 2 === 0 ? -30 : 30,
            duration: 0.8,
            delay: i * 0.15
        });
    });
    
    // Contact section animations
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -50,
        duration: 1
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 50,
        duration: 1
    });
}
