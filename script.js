// Modern JavaScript for Aventra Lab Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initFormHandling();
    initParticleEffects();
    initLoadingScreen();
    initModernInteractions();
    initParallaxEffects();
    initHeroInteractions();
    initAdvancedAnimations();
    initScrollAnimations();
    initParticleSystem();
    initMicroInteractions();
    
    // Advanced design interactions
    initAdvancedDesignInteractions();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Advanced navbar scroll effect
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll with smooth transition
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.research-card, .founder-card, .program-card, .opportunity-card, .contact-item, .stat-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .research-card, .founder-card, .program-card, .opportunity-card, .contact-item, .stat-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Form handling
function initFormHandling() {
    const form = document.querySelector('.form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            form.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--card-bg);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-lg);
            padding: 1rem;
            backdrop-filter: blur(20px);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left: 4px solid var(--accent-tertiary);
        }
        
        .notification-error {
            border-left: 4px solid #ef4444;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-message {
            color: var(--text-primary);
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            color: var(--text-primary);
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Particle effects
function initParticleEffects() {
    // Enhanced floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            const randomRotate = (Math.random() - 0.5) * 10;
            
            element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        }, 3000 + index * 500);
    });
    
}

// Loading screen
function initLoadingScreen() {
    // Enhanced loading screen with company branding
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <img src="img/LOGO.png" alt="Aventra Lab Logo">
            </div>
            <div class="loading-text">Aventra Lab</div>
            <div class="loading-tagline">Dream | Design | Deploy</div>
            <div class="loading-progress">
                <div class="progress-bar" id="progress-bar"></div>
            </div>
            <div class="loading-percentage" id="loading-percentage">0%</div>
            <div class="loading-message" id="loading-message">Initializing...</div>
        </div>
    `;
    
    // Add loading screen styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        }
        
        .loading-screen.fade-out {
            opacity: 0;
            pointer-events: none;
        }
        
        .loading-content {
            text-align: center;
            max-width: 400px;
            padding: 2rem;
        }
        
        .loading-logo {
            margin-bottom: 2rem;
        }
        
        .loading-logo-img {
            width: 80px;
            height: 80px;
            object-fit: contain;
            filter: brightness(0) invert(1);
            animation: pulse 2s ease-in-out infinite;
        }
        
        .loading-text h2 {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .loading-text p {
            color: var(--text-secondary);
            margin-bottom: 2rem;
        }
        
        .loading-progress {
            margin-bottom: 1rem;
        }
        
        .progress-bar {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        
        .progress-fill {
            height: 100%;
            background: var(--gradient-primary);
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .loading-percentage {
            font-size: 0.875rem;
            color: var(--text-secondary);
            font-weight: 600;
        }
        
        .loading-message {
            font-size: 0.875rem;
            color: var(--text-muted);
            font-style: italic;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(loadingScreen);
    
    // Enhanced loading progress with dynamic messages
    let progress = 0;
    const messages = [
        'Initializing systems...',
        'Loading research data...',
        'Preparing AI models...',
        'Setting up robotics framework...',
        'Connecting to IoT networks...',
        'Optimizing performance...',
        'Finalizing interface...',
        'Ready to innovate!'
    ];
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 12 + 3; // More controlled progress
        if (progress > 100) progress = 100;
        
        const progressBar = loadingScreen.querySelector('#progress-bar');
        const percentage = loadingScreen.querySelector('#loading-percentage');
        const message = loadingScreen.querySelector('#loading-message');
        
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (percentage) percentage.textContent = `${Math.round(progress)}%`;
        if (message && progress < 100) {
            const messageIndex = Math.floor((progress / 100) * messages.length);
            message.textContent = messages[messageIndex] || messages[0];
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            if (message) message.textContent = messages[messages.length - 1];
            
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 800);
            }, 1500);
        }
    }, 300);
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
});

// Card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.research-card, .founder-card, .program-card, .opportunity-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }
});

// Performance optimization
const optimizedScrollHandler = throttle(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Modern Interactions
function initModernInteractions() {
    // Enhanced button interactions with ripple effect
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple styles
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Premium luxury card interactions
    const cards = document.querySelectorAll('.research-card, .founder-card, .program-card, .opportunity-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(255, 215, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Premium 3D tilt effect with luxury glow
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            this.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
            this.style.boxShadow = `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(255, 215, 0, 0.2)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Hero Interactions
function initHeroInteractions() {
    const hero = document.querySelector('.hero');
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const centerCore = document.querySelector('.center-core');
    const metrics = document.querySelectorAll('.metric');
    
    // Mouse parallax for hero
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;
            
            // Move showcase items based on mouse position
            showcaseItems.forEach((item, index) => {
                const speed = (index + 1) * 0.3;
                item.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
            });
            
            // Move center core
            if (centerCore) {
                centerCore.style.transform = `translate(-50%, -50%) translate(${xPos * 0.2}px, ${yPos * 0.2}px)`;
            }
        });
        
        hero.addEventListener('mouseleave', () => {
            showcaseItems.forEach(item => {
                item.style.transform = '';
            });
            if (centerCore) {
                centerCore.style.transform = 'translate(-50%, -50%)';
            }
        });
    }
    
    // Showcase item interactions
    showcaseItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click animation
            this.style.animation = 'none';
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.animation = '';
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Metric hover effects
    metrics.forEach(metric => {
        metric.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        metric.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Intersection Observer for hero animations
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Staggered animation for showcase items
                showcaseItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });
    
    if (hero) {
        heroObserver.observe(hero);
    }
}

// Enhanced Scroll-triggered Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add special effects based on animation type
                if (entry.target.classList.contains('animate-bounce-in')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .animate-slide-up, .animate-slide-left, .animate-slide-right, .animate-scale-in, .animate-flip-in, .animate-bounce-in'
    );
    animatedElements.forEach(el => observer.observe(el));
}

// Enhanced Interactive Particle System
function initParticleSystem() {
    const container = document.getElementById('particle-container');
    if (!container) return;

    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;

    // Create interactive particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle interactive';
        
        // Random positioning and properties
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 8) + 's';
        
        // Add hover effects
        particle.addEventListener('mouseenter', () => {
            particle.classList.add('pulse');
        });
        
        particle.addEventListener('mouseleave', () => {
            particle.classList.remove('pulse');
        });
        
        container.appendChild(particle);
        particles.push(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                particles = particles.filter(p => p !== particle);
            }
        }, 12000);
    }

    // Enhanced mouse movement tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        // Make nearby particles follow mouse
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(mouseX - (rect.left + rect.width/2), 2) + 
                Math.pow(mouseY - (rect.top + rect.height/2), 2)
            );
            
            if (distance < 100) {
                particle.classList.add('mouse-follow');
                const angle = Math.atan2(mouseY - (rect.top + rect.height/2), mouseX - (rect.left + rect.width/2));
                const moveX = Math.cos(angle) * 20;
                const moveY = Math.sin(angle) * 20;
                particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.5)`;
            } else {
                particle.classList.remove('mouse-follow');
                particle.style.transform = '';
            }
        });
        
        // Reset mouse moving flag
        clearTimeout(window.mouseTimeout);
        window.mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
            particles.forEach(particle => {
                particle.classList.remove('mouse-follow');
                particle.style.transform = '';
            });
        }, 1000);
    });

    // Create particles with varying intervals
    function scheduleNextParticle() {
        const delay = Math.random() * 1000 + 500; // 500-1500ms
        setTimeout(() => {
            createParticle();
            scheduleNextParticle();
        }, delay);
    }

    // Start particle creation
    scheduleNextParticle();

    // Create initial particles
    for (let i = 0; i < 15; i++) {
        setTimeout(createParticle, i * 300);
    }
}

// Enhanced Parallax Scrolling Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element, .parallax-bg, .floating-blob, .morphing-shape, .organic-blob');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.05;
            const yPos = -(scrolled * speed);
            const elementRect = element.getBoundingClientRect();
            const elementCenter = elementRect.top + elementRect.height / 2;
            const distanceFromCenter = Math.abs(elementCenter - windowHeight / 2);
            const scale = 1 - (distanceFromCenter / windowHeight) * 0.1;
            
            element.style.transform = `translateY(${yPos}px) scale(${scale})`;
        });
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    function handleScroll() {
        ticking = false;
        requestTick();
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Enhanced Micro-interactions
function initMicroInteractions() {
    // Enhanced button interactions
    const enhancedButtons = document.querySelectorAll('.btn-enhanced');
    enhancedButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Enhanced card tilt effects
    const tiltCards = document.querySelectorAll('.card-tilt, .card-enhanced');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
        });
    });

    // Magnetic hover effects
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;
            
            if (distance < maxDistance) {
                const moveX = (x / maxDistance) * 10;
                const moveY = (y / maxDistance) * 10;
                
                this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1) rotate(2deg)`;
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1) rotate(0deg)';
        });
    });

    // Glow effects
    const glowElements = document.querySelectorAll('.glow-on-hover');
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.4)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}


// Advanced Animations
function initAdvancedAnimations() {
    // Staggered animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe elements for staggered animation
    const animateElements = document.querySelectorAll(
        '.research-card, .founder-card, .program-card, .opportunity-card, .contact-item, .stat-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });


    // Add premium luxury animation styles
    const style = document.createElement('style');
    style.textContent = `
        .research-card, .founder-card, .program-card, .opportunity-card, .contact-item, .stat-card {
            opacity: 0;
            transform: translateY(60px) scale(0.9) rotateX(10deg);
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) scale(1) rotateX(0deg) !important;
        }
        
        /* Premium luxury loading animations */
        @keyframes luxuryShimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
        }
        
        @keyframes luxuryGlow {
            0% { 
                box-shadow: 0 0 10px rgba(255, 215, 0, 0.15);
                transform: scale(1);
            }
            50% { 
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.25), 0 0 30px rgba(255, 215, 0, 0.15);
                transform: scale(1.01);
            }
            100% { 
                box-shadow: 0 0 10px rgba(255, 215, 0, 0.15);
                transform: scale(1);
            }
        }
        
        @keyframes luxuryFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(1deg); }
            50% { transform: translateY(-20px) rotate(0deg); }
            75% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        .shimmer {
            background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
            background-size: 200px 100%;
            animation: luxuryShimmer 3s infinite;
        }
        
        .luxury-glow {
            animation: luxuryGlow 4s ease-in-out infinite;
        }
        
        .luxury-float {
            animation: luxuryFloat 6s ease-in-out infinite;
        }
        
        /* Premium particle effects */
        .premium-particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            animation: luxuryFloat 8s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
}

// Advanced Design Interactions
function initAdvancedDesignInteractions() {
    // Neumorphic button interactions
    const neumorphicButtons = document.querySelectorAll('.neumorphic-button');
    neumorphicButtons.forEach(button => {
        button.addEventListener('mousedown', (e) => {
            button.style.transform = 'translateY(2px) scale(0.98)';
            button.style.boxShadow = 'inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.05)';
        });
        
        button.addEventListener('mouseup', (e) => {
            button.style.transform = 'translateY(-1px) scale(1)';
            button.style.boxShadow = '8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.08)';
        });
        
        button.addEventListener('mouseleave', (e) => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '6px 6px 12px rgba(0, 0, 0, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.05)';
        });
    });
    
    // Liquid button interactions
    const liquidButtons = document.querySelectorAll('.liquid-button');
    liquidButtons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            button.style.borderRadius = '30px';
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', (e) => {
            button.style.borderRadius = '25px';
            button.style.transform = 'scale(1)';
        });
    });
    
    // Holographic text interactions
    const holographicTexts = document.querySelectorAll('.holographic');
    holographicTexts.forEach(text => {
        text.addEventListener('mouseenter', (e) => {
            text.style.animationDuration = '1s';
        });
        
        text.addEventListener('mouseleave', (e) => {
            text.style.animationDuration = '3s';
        });
    });
    
    // Typography 3D interactions
    const typography3D = document.querySelectorAll('.typography-3d');
    typography3D.forEach(text => {
        text.addEventListener('mousemove', (e) => {
            const rect = text.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            text.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        text.addEventListener('mouseleave', (e) => {
            text.style.transform = 'perspective(500px) rotateX(15deg) rotateY(0deg)';
        });
    });
    
    // Physics-based element interactions
    const physicsElements = document.querySelectorAll('.physics-bounce, .physics-spring, .physics-gravity, .physics-pendulum');
    physicsElements.forEach(element => {
        element.addEventListener('click', (e) => {
            element.style.animationPlayState = 'paused';
            setTimeout(() => {
                element.style.animationPlayState = 'running';
            }, 100);
        });
    });
    
    // Glass ultra interactions
    const glassUltra = document.querySelectorAll('.glass-ultra');
    glassUltra.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            element.style.backdropFilter = 'blur(50px) saturate(250%) brightness(130%) contrast(120%)';
            element.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
        
        element.addEventListener('mouseleave', (e) => {
            element.style.backdropFilter = 'blur(40px) saturate(200%) brightness(120%) contrast(110%)';
            element.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
    });
    
    // Iridescent surface interactions
    const iridescentSurfaces = document.querySelectorAll('.iridescent-surface');
    iridescentSurfaces.forEach(surface => {
        surface.addEventListener('mouseenter', (e) => {
            surface.style.animationDuration = '2s';
        });
        
        surface.addEventListener('mouseleave', (e) => {
            surface.style.animationDuration = '5s';
        });
    });
    
    // Liquid morph interactions
    const liquidMorphs = document.querySelectorAll('.liquid-morph');
    liquidMorphs.forEach(morph => {
        morph.addEventListener('mouseenter', (e) => {
            morph.style.animationDuration = '4s';
        });
        
        morph.addEventListener('mouseleave', (e) => {
            morph.style.animationDuration = '8s';
        });
    });
    
    // Organic flow interactions
    const organicFlows = document.querySelectorAll('.organic-flow');
    organicFlows.forEach(flow => {
        flow.addEventListener('mouseenter', (e) => {
            flow.style.animationDuration = '3s';
        });
        
        flow.addEventListener('mouseleave', (e) => {
            flow.style.animationDuration = '6s';
        });
    });
    
    // Depth layer interactions
    const depthLayers = document.querySelectorAll('[class*="depth-layer-"]');
    depthLayers.forEach(layer => {
        layer.addEventListener('mouseenter', (e) => {
            const currentZ = parseInt(layer.style.transform.match(/translateZ\((\d+)px\)/)?.[1] || '0');
            layer.style.transform = `translateZ(${currentZ + 10}px)`;
        });
        
        layer.addEventListener('mouseleave', (e) => {
            const currentZ = parseInt(layer.style.transform.match(/translateZ\((\d+)px\)/)?.[1] || '0');
            layer.style.transform = `translateZ(${Math.max(0, currentZ - 10)}px)`;
        });
    });
}

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js');
    });
}
