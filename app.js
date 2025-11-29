document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initTestimonialSlider();
    initPortfolioModal();
    initContactForm();
    initAccordion();
    initServiceNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    
    // Show home page by default
    showPage('home');
    
    // Update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer__bottom p');
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
    }
});

// 1. Page Navigation System
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

// 2. Show Page Function (Fixed for Pricing and Contact)
function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    const pages = document.querySelectorAll('.page');
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Dynamic ID finding (Works for 'pricing' -> 'pricing-page', 'contact' -> 'contact-page')
    const targetId = pageId + '-page';
    let targetPage = document.getElementById(targetId);

    // Manual overrides if IDs don't match exactly
    if (pageId === 'home') targetPage = document.getElementById('home-page');
    
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        console.error('Page not found:', pageId);
        // Fallback to home
        const homePage = document.getElementById('home-page');
        if(homePage) homePage.classList.add('active');
    }
}

// 3. Mobile Menu Functions (Fixed "Not Defined" Error)
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav__list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (navList.classList.contains('active') && 
                !navToggle.contains(e.target) && 
                !navList.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav__list');
    
    if (navToggle) navToggle.classList.remove('active');
    if (navList) navList.classList.remove('active');
}

// 4. Smooth Scrolling (Fixed '#' Syntax Error)
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Fix: Ignore empty '#' links to prevent crashing
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }

            // Only scroll if the target exists on the CURRENT visible page
            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (error) {
                // Ignore errors for invalid selectors
                console.log('Smooth scroll ignored for:', href);
            }
        });
    });
}

// 5. Contact Form (WhatsApp Integration)
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
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
    });
}

// 6. Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length === 0) return;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        if (testimonials[index]) testimonials[index].classList.add('active');
    }
    
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 6000);
}

// 7. Portfolio Modal
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

// 8. Accordion
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

// 9. Service Navigation
function initServiceNavigation() {
    const cards = document.querySelectorAll('.service-overview-card, .card');
    
    cards.forEach(card => {
        // Find links inside cards that have data-page attributes
        const link = card.querySelector('a[data-page]');
        if (link) {
            // Make the whole card clickable
            card.addEventListener('click', function(e) {
                // Don't trigger if user clicked a button or link directly (to avoid double trigger)
                if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                    const targetPage = link.getAttribute('data-page');
                    showPage(targetPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    });
}

// 10. Scroll Animations
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

// 11. Hero Carousel
document.addEventListener('DOMContentLoaded', function() {
    const wrap = document.querySelector('.slides-wrap');
    const slides = document.querySelectorAll('.slide');
    if (!wrap || slides.length === 0) return;

    let current = 0;
    setInterval(() => {
        current = (current + 1) % slides.length;
        wrap.style.transform = `translateX(-${current * 100}%)`;
    }, 3000);
});

// Utility: Debounce for Resize (Fixes "later is not defined" error)
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}, 250));