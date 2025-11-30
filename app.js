/* =========================================
   1. NAVIGATION SYSTEM
   ========================================= */
function initNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            showPage(targetPage);
            
            // Update active state for main nav links
            if (this.classList.contains('nav__link')) {
                document.querySelectorAll('.nav__link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
            
            // Close mobile menu if open
            closeMobileMenu();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    const pages = document.querySelectorAll('.page');
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Dynamic ID finding
    const targetId = pageId + '-page';
    let targetPage = document.getElementById(targetId);

    // Manual overrides
    if (pageId === 'home') targetPage = document.getElementById('home-page');
    else if (pageId === 'services-social') targetPage = document.getElementById('services-social-page');

    if (targetPage) {
        targetPage.classList.add('active');
        
        // Update the URL Hash without reloading (e.g. #services-social)
        if(history.pushState) {
            history.pushState(null, null, '#' + pageId);
        } else {
            window.location.hash = pageId;
        }
        
    } else {
        console.error('Page not found:', pageId);
        // Fallback to home
        const homePage = document.getElementById('home-page');
        if(homePage) homePage.classList.add('active');
    }
}

/* =========================================
   2. MOBILE MENU
   ========================================= */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav__list');

    if (navToggle && navList) {
        // Clear old listeners to be safe
        const newToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newToggle, navToggle);
        
        newToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (navList.classList.contains('active') && 
                !newToggle.contains(e.target) && 
                !navList.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close when clicking a link inside the menu
        const menuLinks = navList.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
}

function closeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav__list');
    
    if (navToggle) navToggle.classList.remove('active');
    if (navList) navList.classList.remove('active');
}

/* =========================================
   3. SMOOTH SCROLLING
   ========================================= */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignore empty '#' links to prevent errors
            if (href === '#' || href === '' || href === 'javascript:void(0)') {
                return;
            }

            try {
                if (href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            } catch (error) {
                // Ignore errors
            }
        });
    });
}

/* =========================================
   4. CONTACT FORM (WhatsApp)
   ========================================= */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.onsubmit = function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const budget = document.getElementById('budget').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        const whatsappMessage = 
            `*New Project Inquiry from BisenX Website*` +
            `\n\n*Name:* ${name}` +
            `\n*Email:* ${email}` +
            `\n*Company:* ${company || 'N/A'}` +
            `\n*Budget:* ${budget}` +
            `\n*Message:* ${message}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const phoneNumber = "917371015156"; 
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        
        // Reset the form
        contactForm.reset();
    };
}

/* =========================================
   5. UI COMPONENTS
   ========================================= */
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length === 0) return;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        if (testimonials[index]) testimonials[index].classList.add('active');
    }
    
    if (window.testimonialInterval) clearInterval(window.testimonialInterval);
    
    window.testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 6000);
}

function initPortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    const modalTriggers = document.querySelectorAll('.portfolio-modal-trigger');
    const modalClose = document.querySelector('.modal__close');
    const modalOverlay = document.querySelector('.modal__overlay');
    
    if (!modal) return;
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion__header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            accordionHeaders.forEach(otherHeader => {
                otherHeader.classList.remove('active');
                if (otherHeader.nextElementSibling) {
                    otherHeader.nextElementSibling.classList.remove('active');
                }
            });
            
            if (!isActive && content) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });
}

function initServiceNavigation() {
    const cards = document.querySelectorAll('.service-overview-card, .card');
    
    cards.forEach(card => {
        const link = card.querySelector('a[data-page]');
        if (link) {
            card.addEventListener('click', function(e) {
                if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                    const targetPage = link.getAttribute('data-page');
                    showPage(targetPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.card, .metric').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initHeroCarousel() {
    const wrap = document.querySelector('.slides-wrap');
    const slides = document.querySelectorAll('.slide');
    if (!wrap || slides.length === 0) return;

    let current = 0;
    if (window.carouselInterval) clearInterval(window.carouselInterval);

    window.carouselInterval = setInterval(() => {
        current = (current + 1) % slides.length;
        wrap.style.transform = `translateX(-${current * 100}%)`;
    }, 3000);
}

// Utility: Debounce
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/* =========================================
   6. STARTUP LOGIC
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized');
    
    // Initialize all functionality (Wrapped in try/catch to prevent one error stopping everything)
    try { initNavigation(); } catch(e) { console.error('Nav Error:', e); }
    try { initMobileMenu(); } catch(e) { console.error('Menu Error:', e); }
    try { initTestimonialSlider(); } catch(e) { console.error('Slider Error:', e); }
    try { initPortfolioModal(); } catch(e) { console.error('Modal Error:', e); }
    try { initContactForm(); } catch(e) { console.error('Contact Error:', e); }
    try { initAccordion(); } catch(e) { console.error('Accordion Error:', e); }
    try { initServiceNavigation(); } catch(e) { console.error('Service Nav Error:', e); }
    try { initSmoothScrolling(); } catch(e) { console.error('Scroll Error:', e); }
    try { initScrollAnimations(); } catch(e) { console.error('Anim Error:', e); }
    try { initHeroCarousel(); } catch(e) { console.error('Carousel Error:', e); }
    
    // Handle URL Hash (for direct links like #services-social)
    const hash = window.location.hash.substring(1); 
    if (hash) {
        showPage(hash);
    } else {
        showPage('home');
    }
    
    // Handle Browser Back/Forward buttons
    window.addEventListener('hashchange', function() {
        const newHash = window.location.hash.substring(1);
        if (newHash) {
            showPage(newHash);
        } else {
            showPage('home');
        }
    });

    // Update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer__bottom p');
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
    }
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250));
});