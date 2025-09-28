document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initTestimonialSlider();
    initPortfolioModal();
    initContactForm();
    initAccordion();
    initServiceNavigation();
    
    // Show home page by default
    showPage('home');
});

// Page Navigation System
function initNavigation() {
    // Get all navigation links with data-page attributes
    const navLinks = document.querySelectorAll('[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Show the target page
            showPage(targetPage);
            
            // Update active nav link - only for main nav links
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
    console.log('Showing page:', pageId); // Debug log
    
    const pages = document.querySelectorAll('.page');
    let targetPage = null;
    
    // Find the target page by ID
    if (pageId === 'home') {
        targetPage = document.getElementById('home-page');
    } else if (pageId === 'about') {
        targetPage = document.getElementById('about-page');
    } else if (pageId === 'services') {
        targetPage = document.getElementById('services-page');
    } else if (pageId === 'services-custom') {
        targetPage = document.getElementById('services-custom-page');
    } else if (pageId === 'services-commerce') {
        targetPage = document.getElementById('services-commerce-page');
    } else if (pageId === 'services-ai') {
        targetPage = document.getElementById('services-ai-page');
    } else if (pageId === 'services-salesforce') {
        targetPage = document.getElementById('services-salesforce-page');
    } else if (pageId === 'portfolio') {
        targetPage = document.getElementById('portfolio-page');
    } else if (pageId === 'insights') {
        targetPage = document.getElementById('insights-page');
    } 
    else if (pageId === 'careers') {
       targetPage = document.getElementById('careers-page');
     }// else if (pageId === 'workshop') {
    //    targetPage = document.getElementById('workshop-page');} // 
    else if (pageId === 'contact') {
        targetPage = document.getElementById('contact-page');
    }
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('Page shown:', targetPage.id); // Debug log
    } else {
        console.error('Page not found:', pageId); // Debug log
        // Fallback to home page
        const homePage = document.getElementById('home-page');
        if (homePage) {
            homePage.classList.add('active');
        }
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav__list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav') && navList && navList.classList.contains('mobile-active')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const navList = document.querySelector('.nav__list');
    const navToggle = document.getElementById('navToggle');
    
    if (navList && navToggle) {
        navList.classList.remove('mobile-active');
        navToggle.classList.remove('active');
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length === 0) return;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Show first testimonial
    showTestimonial(0);
    
    // Auto advance every 6 seconds
    setInterval(nextTestimonial, 6000);
}

// Portfolio Modal
function initPortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    const modalTriggers = document.querySelectorAll('.portfolio-modal-trigger');
    const modalClose = document.querySelector('.modal__close');
    const modalOverlay = document.querySelector('.modal__overlay');
    
    if (!modal) return;
    
    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const budget = formData.get('budget');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields (Name, Email, and Message).');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Success message
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        
        // Reset form
        this.reset();
    });
}

// Accordion Functionality
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion__header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all accordion items
            accordionHeaders.forEach(otherHeader => {
                otherHeader.classList.remove('active');
                if (otherHeader.nextElementSibling) {
                    otherHeader.nextElementSibling.classList.remove('active');
                }
            });
            
            // Open clicked item if it wasn't active
            if (!isActive && content) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });
}

// Service Navigation
function initServiceNavigation() {
    const serviceCards = document.querySelectorAll('.service-overview-card');
    
    serviceCards.forEach(card => {
        const link = card.querySelector('a[data-page]');
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetPage = this.getAttribute('data-page');
                showPage(targetPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Also make the entire card clickable
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                const link = this.querySelector('a[data-page]');
                if (link) {
                    const targetPage = link.getAttribute('data-page');
                    showPage(targetPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
    });
}

// Enhanced navigation with breadcrumbs
function updateBreadcrumb(pageName) {
    // This could be expanded to show breadcrumb navigation
    document.title = `Closeloop Clone - ${pageName}`;
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections for animation
    document.querySelectorAll('.card, .metric, .pillar').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const errorElement = input.parentElement.querySelector('.error-message');
        
        // Remove existing error
        if (errorElement) {
            errorElement.remove();
        }
        
        // Reset input styling
        input.style.borderColor = '';
        
        // Validate input
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            showFieldError(input, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '4px';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
    input.style.borderColor = '#ff4444';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        closeMobileMenu();
    }
}, 250));

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initScrollAnimations();
    
    // Add dynamic year to copyright
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer__bottom p');
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
    }
    
    // Add hover effects to interactive elements
    document.querySelectorAll('.card, .btn').forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (this.classList.contains('card')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.classList.contains('card')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add click tracking for analytics (placeholder)
    document.addEventListener('click', function(e) {
        if (e.target.matches('button, .btn, a[data-page]')) {
            console.log('Navigation clicked:', e.target.textContent.trim() || e.target.getAttribute('data-page'));
        }
    });
});

// Handle form input improvements
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        // Clear error styling on input
        input.addEventListener('input', function() {
            this.style.borderColor = '';
            const errorElement = this.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        });
        
        // Add focus/blur styling
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = '0 0 0 3px rgba(0, 59, 119, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });
    });
});

// Enhanced dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.nav__dropdown');
    
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.nav__dropdown-menu');
        if (!menu) return;
        
        let timeoutId;
        
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(timeoutId);
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            timeoutId = setTimeout(() => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    setTimeout(() => {
        if (performance.getEntriesByType) {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Page load time:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
            }
        }
    }, 0);
});

// Hero crousal
document.addEventListener('DOMContentLoaded', function() {
  const wrap = document.querySelector('.slides-wrap');
  const slides = document.querySelectorAll('.slide');
  
  let current = 0;

  // Function to update the visible slide
  function updateCarousel() {
    wrap.style.transform = `translateX(-${current * 100}%)`;
  }

  // Auto-scroll every 3 seconds
  let autoScroll = setInterval(() => {
  current = (current + 1) % slides.length;
  updateCarousel();
  }, 3000);

})
