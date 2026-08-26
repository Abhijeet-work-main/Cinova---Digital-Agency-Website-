// Cinova - Digital Video Editing & Motion Agency
// Cuberto-inspired interactive JavaScript

// Initialize EmailJS
(function() {
    emailjs.init("hwR_1siZix0zs3Aoc");
})();

// Global variables
let cursor;
let cursorFollower;
let isLoading = true;
let navbar;
let menuBubble;
let fullscreenMenu;
let contactForm;

// Loading screen controller
class LoadingController {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingBar = document.querySelector('.loading-bar');
        this.progress = 0;
        this.targetProgress = 0;
        this.isComplete = false;
    }

    init() {
        this.simulateLoading();
        this.checkPageLoad();
    }

    simulateLoading() {
        const interval = setInterval(() => {
            if (this.progress < this.targetProgress) {
                this.progress += Math.random() * 15;
                this.updateProgress();
            }
        }, 200);

        // Simulate loading stages
        setTimeout(() => this.targetProgress = 30, 300);
        setTimeout(() => this.targetProgress = 60, 600);
        setTimeout(() => this.targetProgress = 90, 1000);
        
        setTimeout(() => {
            clearInterval(interval);
            this.targetProgress = 100;
            this.progress = 100;
            this.updateProgress();
            this.complete();
        }, 1500);
    }

    updateProgress() {
        if (this.loadingBar) {
            this.loadingBar.style.width = `${Math.min(this.progress, 100)}%`;
        }
    }

    checkPageLoad() {
        if (document.readyState === 'complete') {
            this.targetProgress = 100;
        } else {
            window.addEventListener('load', () => {
                this.targetProgress = 100;
            });
        }
    }

    complete() {
        if (this.isComplete) return;
        this.isComplete = true;
        
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
            isLoading = false;
            
            // Initialize other components after loading
            initializeComponents();
        }, 500);
    }
}

// Custom cursor controller
class CursorController {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.cursorFollower = document.getElementById('cursor-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.followerX = 0;
        this.followerY = 0;
        this.isActive = false;
        this.firstMove = true;
    }

    init() {
        if (!this.cursor || !this.cursorFollower) return;
        
        // Hide cursor on mobile
        if (window.innerWidth <= 768) {
            this.cursor.style.display = 'none';
            this.cursorFollower.style.display = 'none';
            return;
        }

        // Completely hide cursors initially
        this.cursor.style.display = 'none';
        this.cursorFollower.style.display = 'none';
        this.cursor.style.opacity = '0';
        this.cursorFollower.style.opacity = '0';
        this.cursor.style.visibility = 'hidden';
        this.cursorFollower.style.visibility = 'hidden';
        
        // Initialize positions off-screen
        this.mouseX = -1000;
        this.mouseY = -1000;
        this.followerX = -1000;
        this.followerY = -1000;

        // Set initial positions way off-screen
        this.cursor.style.left = this.mouseX + 'px';
        this.cursor.style.top = this.mouseY + 'px';
        this.cursorFollower.style.left = this.followerX + 'px';
        this.cursorFollower.style.top = this.followerY + 'px';
        
        // Ensure cursor stays above menu
        this.cursor.style.zIndex = '10001';
        this.cursorFollower.style.zIndex = '10001';

        this.bindEvents();
        this.animate();
        this.isActive = true;
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Show cursor on first mouse movement
            if (this.firstMove && this.isActive && window.innerWidth > 768) {
                // Initialize follower position to current mouse position to prevent jumping
                this.followerX = this.mouseX;
                this.followerY = this.mouseY;
                
                // Show and position both cursors
                this.cursor.style.display = 'block';
                this.cursorFollower.style.display = 'block';
                this.cursor.style.visibility = 'visible';
                this.cursorFollower.style.visibility = 'visible';
                this.cursor.style.opacity = '1';
                this.cursorFollower.style.opacity = '1';
                
                // Set positions immediately
                this.cursor.style.left = this.mouseX + 'px';
                this.cursor.style.top = this.mouseY + 'px';
                this.cursorFollower.style.left = this.followerX + 'px';
                this.cursorFollower.style.top = this.followerY + 'px';
                
                // Fix mix-blend-mode issue for cursor visibility
                this.cursor.style.mixBlendMode = 'normal';
                this.cursor.style.backgroundColor = '#ffffff';
                
                this.firstMove = false;
            }
        });

        document.addEventListener('mouseenter', () => {
            // Only show cursor on mouseenter if it has already been shown via mousemove
            if (this.isActive && window.innerWidth > 768 && !this.firstMove) {
                this.cursor.style.display = 'block';
                this.cursorFollower.style.display = 'block';
                this.cursor.style.opacity = '1';
                this.cursorFollower.style.opacity = '1';
                this.cursor.style.visibility = 'visible';
                this.cursorFollower.style.visibility = 'visible';
            }
        });

        document.addEventListener('mouseleave', (e) => {
            // Only hide cursor if actually leaving the viewport, not when menu opens
            if (e.clientY <= 0 || e.clientX <= 0 || 
                e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
                this.cursor.style.opacity = '0';
                this.cursorFollower.style.opacity = '0';
            }
        });

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .stat-item, .nav-menu-bubble');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                this.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    animate() {
        if (!this.isActive) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        // Only animate if cursor has been shown
        if (!this.firstMove) {
            // Smooth cursor movement
            this.cursor.style.left = this.mouseX + 'px';
            this.cursor.style.top = this.mouseY + 'px';

            // Smooth follower movement with delay
            this.followerX += (this.mouseX - this.followerX) * 0.1;
            this.followerY += (this.mouseY - this.followerY) * 0.1;

            this.cursorFollower.style.left = this.followerX + 'px';
            this.cursorFollower.style.top = this.followerY + 'px';
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Navigation controller - Updated for Cuberto style
class NavigationController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.menuBubble = document.getElementById('nav-menu-bubble');
        this.menuHamburger = document.getElementById('menu-hamburger');
        this.fullscreenMenu = document.getElementById('fullscreen-menu');
        this.menuClose = document.getElementById('menu-close');
        this.menuLinks = document.querySelectorAll('.menu-link');
        this.isMenuOpen = false;
        this.scrollThreshold = 100;
    }

    init() {
        this.bindEvents();
        this.handleScroll();
        this.initMagneticEffect();
    }

    bindEvents() {
        // Scroll handling
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Menu bubble click
        if (this.menuBubble) {
            this.menuBubble.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Menu close button
        if (this.menuClose) {
            this.menuClose.addEventListener('click', () => {
                this.closeMenu();
            });
        }

        // Close menu when clicking outside
        if (this.fullscreenMenu) {
            this.fullscreenMenu.addEventListener('click', (e) => {
                if (e.target === this.fullscreenMenu) {
                    this.closeMenu();
                }
            });
        }

        // Handle menu navigation links
        this.menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.scrollToElement(targetElement);
                }
                
                if (this.isMenuOpen) {
                    this.closeMenu();
                }
            });
        });

        // Handle ESC key for menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    initMagneticEffect() {
        if (!this.menuBubble) return;
        
        this.menuBubble.addEventListener('mousemove', (e) => {
            const rect = this.menuBubble.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.3;
            const deltaY = (e.clientY - centerY) * 0.3;
            
            this.menuBubble.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        this.menuBubble.addEventListener('mouseleave', () => {
            this.menuBubble.style.transform = 'translate(0, 0)';
        });
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        
        if (scrollY > this.scrollThreshold) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isMenuOpen = true;
        this.menuBubble.classList.add('active');
        this.fullscreenMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Ensure cursor stays visible during menu opening (only if already shown)
        if (cursor && cursor.cursor && cursor.cursorFollower && !cursor.firstMove) {
            cursor.cursor.style.display = 'block';
            cursor.cursorFollower.style.display = 'block';
            cursor.cursor.style.opacity = '1';
            cursor.cursorFollower.style.opacity = '1';
            cursor.cursor.style.visibility = 'visible';
            cursor.cursorFollower.style.visibility = 'visible';
        }
        
        // Animate menu links with stagger
        const menuItems = this.fullscreenMenu.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            const linkText = item.querySelector('.menu-link-text');
            if (linkText) {
                setTimeout(() => {
                    linkText.style.transform = 'translateY(0)';
                }, 100 + (index * 100));
            }
        });
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.menuBubble.classList.remove('active');
        this.fullscreenMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Ensure cursor stays visible during menu closing
        if (cursor && cursor.cursor && cursor.cursorFollower) {
            cursor.cursor.style.opacity = '1';
            cursor.cursorFollower.style.opacity = '1';
            cursor.cursor.style.visibility = 'visible';
            cursor.cursorFollower.style.visibility = 'visible';
        }
        
        // Reset menu link positions
        const menuItems = this.fullscreenMenu.querySelectorAll('.menu-link-text');
        menuItems.forEach(linkText => {
            linkText.style.transform = 'translateY(100%)';
        });
    }

    scrollToElement(element) {
        const headerHeight = this.navbar.offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll animations controller
class ScrollAnimationsController {
    constructor() {
        this.animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        this.observer = null;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        
        this.createObserver();
        this.observeElements();
        this.animateNumbers();
        this.isInitialized = true;
    }

    createObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
    }

    observeElements() {
        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateNumbers() {
        const numberElements = document.querySelectorAll('.stat-number');
        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                    numberObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        numberElements.forEach(element => {
            numberObserver.observe(element);
        });
    }

    animateNumber(element) {
        const targetText = element.textContent;
        const targetNumber = parseInt(targetText.replace(/[^\d]/g, ''));
        const suffix = targetText.replace(/[\d]/g, '');
        
        let currentNumber = 0;
        const increment = targetNumber / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            currentNumber += increment;
            
            if (currentNumber >= targetNumber) {
                element.textContent = targetText;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentNumber) + suffix;
            }
        }, stepTime);
    }
}

// Contact form controller
class ContactFormController {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = this.form?.querySelector('.submit-btn');
        this.btnText = this.submitBtn?.querySelector('.btn-text');
        this.btnLoading = this.submitBtn?.querySelector('.btn-loading');
        this.isSubmitting = false;
    }

    init() {
        if (!this.form) return;
        
        this.bindEvents();
        this.setupValidation();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    setupValidation() {
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.addEventListener('invalid', (e) => {
                e.preventDefault();
                this.showFieldError(field, this.getValidationMessage(field));
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        if (field.required && !value) {
            this.showFieldError(field, `${this.getFieldLabel(fieldName)} is required`);
            return false;
        }
        
        if (fieldName === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.5rem';
        
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = '#ff6b6b';
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '';
    }

    getFieldLabel(fieldName) {
        const labels = {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message'
        };
        return labels[fieldName] || fieldName;
    }

    getValidationMessage(field) {
        if (field.validity.valueMissing) {
            return `${this.getFieldLabel(field.name)} is required`;
        }
        if (field.validity.typeMismatch) {
            return 'Please enter a valid email address';
        }
        return 'Please check your input';
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async handleSubmit() {
        if (this.isSubmitting) return;
        
        // Validate all fields
        const fields = this.form.querySelectorAll('input, textarea');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showNotification('Please fix the errors before submitting', 'error');
            return;
        }
        
        this.setLoadingState(true);
        
        try {
            const formData = new FormData(this.form);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                to_email: 'xabhijeetxa@gmail.com'
            };
            
            await emailjs.send(
                'service_qose4pc',
                'template_rhzmzcg',
                templateParams
            );
            
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.form.reset();
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            this.showNotification('Failed to send message. Please try again or contact us directly.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    setLoadingState(isLoading) {
        this.isSubmitting = isLoading;
        
        if (isLoading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
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
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#B6F500' : type === 'error' ? '#ff6b6b' : '#333'};
            color: ${type === 'success' ? '#000' : '#fff'};
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 400px;
            font-family: var(--font-primary);
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;
        
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Handle close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.hideNotification(notification);
        });
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                this.hideNotification(notification);
            }
        }, 5000);
    }

    hideNotification(notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
}

// Performance optimization
class PerformanceController {
    constructor() {
        this.resizeTimer = null;
        this.scrollTimer = null;
    }

    init() {
        this.optimizeImages();
        this.throttleEvents();
        this.preloadCriticalResources();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    throttleEvents() {
        // Throttle resize events
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 150);
        });
    }

    handleResize() {
        // Reinitialize components that need resize handling
        if (window.innerWidth <= 768) {
            if (cursor?.isActive) {
                cursor.cursor.style.display = 'none';
                cursor.cursorFollower.style.display = 'none';
            }
        } else {
            if (cursor && !cursor.isActive) {
                cursor.init();
            }
        }
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const fontPreloads = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
            'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap'
        ];

        fontPreloads.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            document.head.appendChild(link);
        });
    }
}

// Services drag controller
class ServicesDragController {
    constructor() {
        this.servicesCards = document.getElementById('services-cards');
        this.dragCursor = null;
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.initialTransform = 0;
        this.dragThreshold = 5;
        this.momentum = 0;
        this.animationId = null;
        this.isMouseDown = false;
        this.maxDrag = 0;
    }

    init() {
        if (!this.servicesCards) return;
        
        this.calculateMaxDrag();
        this.createDragCursor();
        this.bindEvents();
        this.setupCardHoverEffects();
    }

    calculateMaxDrag() {
        const wrapper = this.servicesCards.parentElement;
        const wrapperWidth = wrapper.offsetWidth;
        const cardsWidth = this.servicesCards.scrollWidth;
        this.maxDrag = Math.max(0, cardsWidth - wrapperWidth + 160); // 160px for padding
    }

    createDragCursor() {
        this.dragCursor = document.createElement('div');
        this.dragCursor.className = 'cursor-drag';
        this.dragCursor.textContent = 'drag';
        document.body.appendChild(this.dragCursor);
    }

    bindEvents() {
        // Mouse events
        this.servicesCards.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.servicesCards.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

        // Touch events for mobile
        this.servicesCards.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));

        // Prevent default drag behavior
        this.servicesCards.addEventListener('dragstart', (e) => e.preventDefault());
        
        // Recalculate on resize
        window.addEventListener('resize', () => {
            this.calculateMaxDrag();
        });
    }

    setupCardHoverEffects() {
        const cards = this.servicesCards.querySelectorAll('.service-card-drag');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.showDragCursor(e);
            });
            
            card.addEventListener('mouseleave', () => {
                if (!this.isDragging) {
                    this.hideDragCursor();
                }
            });
            
            card.addEventListener('mousemove', (e) => {
                this.updateDragCursor(e);
            });
        });
    }

    showDragCursor(e) {
        if (this.isDragging || window.innerWidth <= 768) return;
        
        requestAnimationFrame(() => {
            this.dragCursor.classList.add('active');
            this.updateDragCursor(e);
        });
        
        // Smoothly hide default cursor
        if (cursor && cursor.cursor && cursor.cursorFollower) {
            cursor.cursor.style.transition = 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cursor.cursorFollower.style.transition = 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cursor.cursor.style.opacity = '0';
            cursor.cursorFollower.style.opacity = '0';
        }
    }

    hideDragCursor() {
        if (this.isDragging) return;
        
        requestAnimationFrame(() => {
            this.dragCursor.classList.remove('active');
        });
        
        // Smoothly show default cursor (only if it has been shown before)
        if (cursor && cursor.cursor && cursor.cursorFollower && !cursor.firstMove) {
            cursor.cursor.style.display = 'block';
            cursor.cursorFollower.style.display = 'block';
            cursor.cursor.style.transition = 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cursor.cursorFollower.style.transition = 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cursor.cursor.style.opacity = '1';
            cursor.cursorFollower.style.opacity = '1';
        }
    }

    updateDragCursor(e) {
        if (!this.dragCursor.classList.contains('active')) return;
        
        requestAnimationFrame(() => {
            this.dragCursor.style.left = e.clientX + 'px';
            this.dragCursor.style.top = e.clientY + 'px';
        });
    }

    handleMouseDown(e) {
        this.isMouseDown = true;
        this.startX = e.clientX;
        this.currentX = this.getCurrentTransform();
        this.initialTransform = this.currentX;
        this.servicesCards.classList.add('dragging');
        
        // Prevent text selection
        e.preventDefault();
    }

    handleMouseMove(e) {
        if (!this.isMouseDown) return;

        const deltaX = e.clientX - this.startX;
        
        if (!this.isDragging && Math.abs(deltaX) > this.dragThreshold) {
            this.isDragging = true;
            this.servicesCards.style.userSelect = 'none';
        }

        if (this.isDragging) {
            const newX = this.initialTransform + deltaX;
            const clampedX = Math.max(-this.maxDrag, Math.min(0, newX));
            this.setTransform(clampedX);
            this.momentum = deltaX * 0.1;
        }

        this.updateDragCursor(e);
    }

    handleMouseUp() {
        this.isMouseDown = false;
        this.servicesCards.classList.remove('dragging');
        
        if (this.isDragging) {
            this.applyMomentum();
            setTimeout(() => {
                this.isDragging = false;
                this.servicesCards.style.userSelect = 'auto';
            }, 100);
        }
    }

    handleMouseLeave() {
        this.hideDragCursor();
    }

    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.currentX = this.getCurrentTransform();
        this.initialTransform = this.currentX;
        this.isDragging = true;
        this.servicesCards.classList.add('dragging');
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        const deltaX = e.touches[0].clientX - this.startX;
        const newX = this.initialTransform + deltaX;
        const clampedX = Math.max(-this.maxDrag, Math.min(0, newX));
        this.setTransform(clampedX);
    }

    handleTouchEnd() {
        this.isDragging = false;
        this.servicesCards.classList.remove('dragging');
    }

    getCurrentTransform() {
        const style = window.getComputedStyle(this.servicesCards);
        const matrix = style.transform;
        if (matrix === 'none') return 0;
        
        const values = matrix.split('(')[1].split(')')[0].split(',');
        return parseFloat(values[4]) || 0;
    }

    setTransform(x) {
        this.servicesCards.style.transform = `translateX(${x}px)`;
        this.currentX = x;
    }

    applyMomentum() {
        if (Math.abs(this.momentum) < 0.1) return;
        
        const newX = this.currentX + this.momentum;
        const clampedX = Math.max(-this.maxDrag, Math.min(0, newX));
        this.setTransform(clampedX);
        this.momentum *= 0.95;
        
        this.animationId = requestAnimationFrame(() => this.applyMomentum());
    }
}

// Projects drag controller
class ProjectsDragController {
    constructor() {
        this.projectsCards = document.getElementById('projects-cards');
        this.dragCursor = null;
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.initialTransform = 0;
        this.dragThreshold = 5;
        this.momentum = 0;
        this.animationId = null;
        this.isMouseDown = false;
        this.maxDrag = 0;
    }

    init() {
        if (!this.projectsCards) return;
        
        this.calculateMaxDrag();
        this.createDragCursor();
        this.bindEvents();
        this.setupCardHoverEffects();
    }

    calculateMaxDrag() {
        const wrapper = this.projectsCards.parentElement;
        const wrapperWidth = wrapper.offsetWidth;
        const cardsWidth = this.projectsCards.scrollWidth;
        this.maxDrag = Math.max(0, cardsWidth - wrapperWidth + 160); // 160px for padding
    }

    createDragCursor() {
        this.dragCursor = document.createElement('div');
        this.dragCursor.className = 'cursor-drag';
        this.dragCursor.textContent = 'drag';
        document.body.appendChild(this.dragCursor);
    }

    bindEvents() {
        // Mouse events
        this.projectsCards.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.projectsCards.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

        // Touch events for mobile
        this.projectsCards.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));

        // Prevent default drag behavior
        this.projectsCards.addEventListener('dragstart', (e) => e.preventDefault());
        
        // Recalculate on resize
        window.addEventListener('resize', () => {
            this.calculateMaxDrag();
        });
    }

    setupCardHoverEffects() {
        const cards = this.projectsCards.querySelectorAll('.project-card-drag');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.showDragCursor(e);
            });
            
            card.addEventListener('mouseleave', () => {
                if (!this.isDragging) {
                    this.hideDragCursor();
                }
            });
            
            card.addEventListener('mousemove', (e) => {
                this.updateDragCursor(e);
            });
        });
    }

    showDragCursor(e) {
        if (this.isDragging || window.innerWidth <= 768) return;
        
        requestAnimationFrame(() => {
            this.dragCursor.classList.add('active');
            this.updateDragCursor(e);
        });
        
        // Smoothly hide default cursor
        if (cursor && cursor.cursor && cursor.cursorFollower) {
            cursor.cursor.style.transition = 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cursor.cursorFollower.style.transition = 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cursor.cursor.style.opacity = '0';
            cursor.cursorFollower.style.opacity = '0';
        }
    }

    hideDragCursor() {
        if (this.isDragging) return;
        
        this.dragCursor.classList.remove('active');
        
        // Restore default cursor
        if (cursor && cursor.cursor && cursor.cursorFollower) {
            cursor.cursor.style.transition = 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cursor.cursorFollower.style.transition = 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cursor.cursor.style.opacity = '1';
            cursor.cursorFollower.style.opacity = '1';
        }
    }

    updateDragCursor(e) {
        if (!this.dragCursor || this.isDragging) return;
        
        const rect = this.dragCursor.getBoundingClientRect();
        const x = e.clientX - rect.width / 2;
        const y = e.clientY - rect.height / 2;
        
        this.dragCursor.style.transform = `translate(${x}px, ${y}px)`;
    }

    handleMouseDown(e) {
        this.isMouseDown = true;
        this.startX = e.clientX - this.getCurrentTransform();
        this.currentX = this.startX;
        
        this.projectsCards.classList.add('dragging');
        this.isDragging = true;
        
        this.hideDragCursor();
        this.projectsCards.style.userSelect = 'none';
    }

    handleMouseMove(e) {
        if (!this.isMouseDown) return;
        
        this.currentX = e.clientX - this.startX;
        const clampedX = Math.max(-this.maxDrag, Math.min(0, this.currentX));
        
        this.setTransform(clampedX);
        
        // Calculate momentum
        const deltaX = e.clientX - (this.startX + this.getCurrentTransform());
        this.momentum = deltaX * 0.1;
    }

    handleMouseUp() {
        if (!this.isMouseDown) return;
        
        this.isMouseDown = false;
        this.projectsCards.classList.remove('dragging');
        this.projectsCards.style.userSelect = 'auto';
        
        // Apply momentum
        if (Math.abs(this.momentum) > 1) {
            this.applyMomentum();
        }
        // Restore main cursor and follower
        if (cursor && cursor.cursor && cursor.cursorFollower && !cursor.firstMove) {
            cursor.cursor.style.display = 'block';
            cursor.cursorFollower.style.display = 'block';
            cursor.cursor.style.opacity = '1';
            cursor.cursorFollower.style.opacity = '1';
            cursor.cursor.style.visibility = 'visible';
            cursor.cursorFollower.style.visibility = 'visible';
        }
    }

    handleMouseLeave() {
        if (this.isMouseDown) {
            this.handleMouseUp();
        }
        // Restore main cursor and follower
        if (cursor && cursor.cursor && cursor.cursorFollower && !cursor.firstMove) {
            cursor.cursor.style.display = 'block';
            cursor.cursorFollower.style.display = 'block';
            cursor.cursor.style.opacity = '1';
            cursor.cursorFollower.style.opacity = '1';
            cursor.cursor.style.visibility = 'visible';
            cursor.cursorFollower.style.visibility = 'visible';
        }
    }

    handleTouchStart(e) {
        const touch = e.touches[0];
        this.isMouseDown = true;
        this.startX = touch.clientX - this.getCurrentTransform();
        this.currentX = this.startX;
        
        this.projectsCards.classList.add('dragging');
        this.isDragging = true;
    }

    handleTouchMove(e) {
        if (!this.isMouseDown) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        this.currentX = touch.clientX - this.startX;
        const clampedX = Math.max(-this.maxDrag, Math.min(0, this.currentX));
        
        this.setTransform(clampedX);
    }

    handleTouchEnd() {
        this.isMouseDown = false;
        this.projectsCards.classList.remove('dragging');
        
        const style = window.getComputedStyle(this.projectsCards);
        const matrix = new DOMMatrix(style.transform);
        const currentX = matrix.m41;
        
        // Snap to bounds
        const clampedX = Math.max(-this.maxDrag, Math.min(0, currentX));
        this.setTransform(clampedX);
        // Restore main cursor and follower
        if (cursor && cursor.cursor && cursor.cursorFollower && !cursor.firstMove) {
            cursor.cursor.style.display = 'block';
            cursor.cursorFollower.style.display = 'block';
            cursor.cursor.style.opacity = '1';
            cursor.cursorFollower.style.opacity = '1';
            cursor.cursor.style.visibility = 'visible';
            cursor.cursorFollower.style.visibility = 'visible';
        }
    }

    getCurrentTransform() {
        const style = window.getComputedStyle(this.projectsCards);
        const matrix = new DOMMatrix(style.transform);
        return matrix.m41;
    }

    setTransform(x) {
        this.projectsCards.style.transform = `translateX(${x}px)`;
    }

    applyMomentum() {
        const currentX = this.getCurrentTransform();
        const newX = currentX + this.momentum;
        const clampedX = Math.max(-this.maxDrag, Math.min(0, newX));
        
        this.setTransform(clampedX);
        this.momentum *= 0.95;
        
        this.animationId = requestAnimationFrame(() => this.applyMomentum());
    }
}

// Why Choose Us Animations Controller
class WhyChooseUsAnimationsController {
    constructor() {
        this.whyChooseUsPoints = [];
        this.observer = null;
    }

    init() {
        this.setupWhyChooseUsAnimations();
    }

    setupWhyChooseUsAnimations() {
        this.whyChooseUsPoints = document.querySelectorAll('.why-choose-us-point');
        
        if (this.whyChooseUsPoints.length === 0) return;

        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateWhyChooseUsPoint(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe all why choose us points
        this.whyChooseUsPoints.forEach(point => {
            this.observer.observe(point);
        });
    }

    animateWhyChooseUsPoint(element) {
        const animationType = element.getAttribute('data-animation');
        
        // Add the animate class based on animation type
        setTimeout(() => {
            element.classList.add('animate');
        }, 100);

        // Unobserve after animation
        if (this.observer) {
            this.observer.unobserve(element);
        }
    }

    // Manual animation methods for easy control
    animateAllPoints() {
        this.whyChooseUsPoints.forEach((point, index) => {
            setTimeout(() => {
                point.classList.add('animate');
            }, index * 200);
        });
    }

    resetAllAnimations() {
        this.whyChooseUsPoints.forEach(point => {
            point.classList.remove('animate');
        });
    }

    animateFromLeft() {
        this.whyChooseUsPoints.forEach(point => {
            point.setAttribute('data-animation', 'fade-left');
            point.classList.remove('animate');
        });
        this.animateAllPoints();
    }

    animateFromRight() {
        this.whyChooseUsPoints.forEach(point => {
            point.setAttribute('data-animation', 'fade-right');
            point.classList.remove('animate');
        });
        this.animateAllPoints();
    }

    animateFromBottom() {
        this.whyChooseUsPoints.forEach(point => {
            point.setAttribute('data-animation', 'fade-up');
            point.classList.remove('animate');
        });
        this.animateAllPoints();
    }
}

// Initialize all components
function initializeComponents() {
    // Initialize cursor
    cursor = new CursorController();
    cursor.init();

    // Initialize navigation
    const navigation = new NavigationController();
    navigation.init();

    // Initialize scroll animations
    const scrollAnimations = new ScrollAnimationsController();
    scrollAnimations.init();

    // Initialize why choose us animations
    const whyChooseUsAnimations = new WhyChooseUsAnimationsController();
    whyChooseUsAnimations.init();

    // Initialize contact form
    const contactForm = new ContactFormController();
    contactForm.init();

    // Initialize performance optimizations
    const performance = new PerformanceController();
    performance.init();

    // Initialize services drag functionality
    const servicesDrag = new ServicesDragController();
    servicesDrag.init();

    // Initialize projects drag functionality
    const projectsDrag = new ProjectsDragController();
    projectsDrag.init();

    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Make cursor globally available for debugging
    if (typeof window !== 'undefined') {
        window.CinovaApp = {
            cursor,
            isLoading,
            initializeComponents,
            whyChooseUsAnimations
        };
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    const loadingController = new LoadingController();
    loadingController.init();

    // Prevent flash of unstyled content
    document.body.style.visibility = 'visible';
    
    // Handle scroll restoration
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // Initialize scroll position
    window.scrollTo(0, 0);
});

// Window load event
window.addEventListener('load', function() {
    // Ensure all resources are loaded
    setTimeout(() => {
        if (isLoading) {
            isLoading = false;
            initializeComponents();
        }
    }, 100);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Handle visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is hidden
        if (cursor) {
            cursor.isActive = false;
        }
    } else {
        // Resume animations when tab is visible
        if (cursor && window.innerWidth > 768) {
            cursor.isActive = true;
            // Only make cursor visible if it has been shown before
            if (cursor.cursor && cursor.cursorFollower && !cursor.firstMove) {
                cursor.cursor.style.display = 'block';
                cursor.cursorFollower.style.display = 'block';
                cursor.cursor.style.opacity = '1';
                cursor.cursorFollower.style.opacity = '1';
                cursor.cursor.style.visibility = 'visible';
                cursor.cursorFollower.style.visibility = 'visible';
            }
            cursor.animate();
        }
    }
});

// Handle page focus to ensure cursor is working
window.addEventListener('focus', function() {
    if (cursor && window.innerWidth > 768) {
        cursor.isActive = true;
        // Only make cursor visible if it has been shown before
        if (cursor.cursor && cursor.cursorFollower && !cursor.firstMove) {
            cursor.cursor.style.display = 'block';
            cursor.cursorFollower.style.display = 'block';
            cursor.cursor.style.opacity = '1';
            cursor.cursorFollower.style.opacity = '1';
            cursor.cursor.style.visibility = 'visible';
            cursor.cursorFollower.style.visibility = 'visible';
        }
        cursor.animate();
    }
});

// Debugging helper
console.log('Cinova App initialized successfully');
// =========================
// HERO GALLERY SECTION
// =========================
document.addEventListener("DOMContentLoaded", function () { 
    var mousePos = { x: 0, y: 0 }; 
    var galleryPos = { x: 0, y: 0}; 
    var galleryBounds = { top: 0, right: 0, bottom: 0, left: 0 }; 

    var galleryBox = document.querySelector('div#gallery-box');
    var galleryInner = document.querySelector('div#gallery-box div.gallery');
    if (!galleryBox || !galleryInner) return;

    function updateGalleryBounds() {
        var rect = galleryBox.getBoundingClientRect();
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        galleryBounds = {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
            right: rect.left + scrollLeft + rect.width,
            bottom: rect.top + scrollTop + rect.height
        };
        galleryPos = {
            x: galleryBounds.left + (rect.width / 2),
            y: galleryBounds.top + (rect.height / 2)
        };
    }

    // Initial calculation after a slight delay to ensure layout is done
    setTimeout(updateGalleryBounds, 100);

    galleryBox.addEventListener('mousemove', function(e) { 
        mousePos = {x: e.pageX, y: e.pageY}; 
        calcOffset(); 
        move(); 
        parallaxPics(); 
    }); 

    galleryBox.addEventListener('mouseleave', function() { 
        galleryInner.setAttribute('data-offset-x', '0'); 
        galleryInner.setAttribute('data-offset-y', '0'); 
        
        var images = document.querySelectorAll('div.item img');
        images.forEach(function(img) { 
            img.style.left = '50%'; 
            img.style.top = '50%'; 
        }); 
        move(); 
    }); 

    window.addEventListener('resize', function() { 
        updateGalleryBounds();
    }); 

    var overlayLinks = document.querySelectorAll('div.overlay a');
    overlayLinks.forEach(function(link) {
        link.addEventListener('mouseleave', function() { 
            link.classList.add('leave'); 
            setTimeout(function() { 
                link.classList.remove('leave'); 
            }, 500); 
        });
    });

    function calcOffset() { 
        var newX = mousePos.x - galleryPos.x; 
        newX = invertValue(newX) / 2; 
        var newY = mousePos.y - galleryPos.y; 
        newY = invertValue(newY); 
        
        galleryInner.setAttribute('data-offset-x', newX); 
        galleryInner.setAttribute('data-offset-y', newY); 
    } 

    function calcPercentage() { 
        var rect = galleryBox.getBoundingClientRect();
        var horizontal = ((mousePos.x - galleryBounds.left) / rect.width) * 100; 
        var vertical = ((mousePos.y - galleryBounds.top) / rect.height) * 100; 
        return { h: horizontal, v: vertical }; 
    } 

    function move() { 
        var newX = galleryInner.getAttribute('data-offset-x') || 0; 
        var newY = galleryInner.getAttribute('data-offset-y') || 0; 
        
        galleryInner.style.transform = 'translate(-50%, -50%) translate('+newX+'px, '+newY+'px)';  
    } 

    function parallaxPics() { 
        var percentages = calcPercentage(); 
        var images = document.querySelectorAll('div.item img');
        images.forEach(function(img) { 
            img.style.left = (100 - percentages.h) + '%'; 
            img.style.top = (100 - percentages.v) + '%'; 
        }); 
    } 

    function invertValue(num) { 
        if(Math.sign(num) == 1) { 
            num = -Math.abs(num); 
        } else { 
            num = Math.abs(num); 
        } 
        return num; 
    }
});

// --- Lottie & Glitter Wrap Additions ---
function initAdvancedLottie() {
    // Attention Lottie
    const attentionContainer = document.getElementById('lottie-attention-choose-us');
    if (attentionContainer && typeof lottie !== 'undefined') {
        lottie.loadAnimation({
            container: attentionContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'Assets/Essential Animations/lottieflow-attention-07-000000-easey.json'
        });
    }

    // Checkboxes
    const checkContainers = document.querySelectorAll('.lottie-check');
    if (typeof lottie !== 'undefined') {
        checkContainers.forEach(container => {
            const anim = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'Assets/Essential Animations/lottieflow-checkbox-09-000000-easey.json'
            });
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => anim.play(), 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(container);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initAdvancedLottie();
});

class GlitterWrap {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.container = canvas.parentElement;
        
        this.options = {
            particleCount: 1000,
            color1: "#ffffff",
            color2: "#FF0000",
            color3: "#FFE500",
            speed: 5,
            density: 100,
            starSize: 10,
            focalDepth: 5,
            turbulence: 0,
            brightness: 100,
            glitterIntensity: 3,
            trailAmount: 30,
            reverse: false,
            ...options
        };

        this.stars = [];
        this.elapsed = 0;
        this.lastT = performance.now();
        this.rafId = null;
        this.size = { w: 0, h: 0, dpr: 1 };
        
        this.colors = {
            parsed1: this.parseColor(this.options.color1),
            parsed2: this.parseColor(this.options.color2),
            parsed3: this.parseColor(this.options.color3),
        };
        this.rgbStrs = [
            `rgb(${this.colors.parsed1[0]}, ${this.colors.parsed1[1]}, ${this.colors.parsed1[2]})`,
            `rgb(${this.colors.parsed2[0]}, ${this.colors.parsed2[1]}, ${this.colors.parsed2[2]})`,
            `rgb(${this.colors.parsed3[0]}, ${this.colors.parsed3[1]}, ${this.colors.parsed3[2]})`,
        ];

        this.init();
    }

    parseColor(input) {
        if (!input) return [255, 255, 255, 1];
        const s = input.trim();
        if (s.startsWith("#")) {
            let hex = s.slice(1);
            if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
            const num = parseInt(hex, 16);
            return [(num >> 16) & 255, (num >> 8) & 255, num & 255, 1];
        }
        const m = s.match(/rgba?\(([^)]+)\)/i);
        if (m) {
            const parts = m[1].split(",").map(p => parseFloat(p.trim()));
            return [parts[0] || 0, parts[1] || 0, parts[2] || 0, parts[3] == null ? 1 : parts[3]];
        }
        return [255, 255, 255, 1];
    }

    cfg() {
        return {
            reverse: this.options.reverse,
            density: this.options.density,
            stepZ: this.options.speed * 0.0008,
            focalDepth: this.options.focalDepth / 100,
            starScale: this.options.starSize * 0.15,
            turbulence: this.options.turbulence * 0.2,
            glitter: this.options.glitterIntensity * 0.1,
            brightness: Math.min(1, this.options.brightness / 100),
            trail: this.options.trailAmount / 100,
        };
    }

    resetStar(s, initial = false) {
        const c = this.cfg();
        const angle = Math.random() * Math.PI * 2;
        const radius = (0.2 + Math.random() * 0.8) * (c.density / 15);
        
        s.x = Math.cos(angle) * radius;
        s.y = Math.sin(angle) * radius;
        
        if (c.reverse) {
            s.z = initial ? c.focalDepth + Math.random() * (1 - c.focalDepth) : c.focalDepth;
        } else {
            s.z = initial ? Math.random() : 1.0;
        }
        
        s.px = NaN;
        s.py = NaN;
        s.seed = Math.random() * 1000;
        s.vmul = 0.6 + Math.random() * 0.8;
        s.colorIdx = Math.floor(Math.random() * 3);
        s.flashUntil = 0;
        s.nextFlash = this.elapsed + 1 + Math.random() * 4 * (1 / Math.max(0.0001, c.glitter));
    }

    makeStar() {
        return { x: 0, y: 0, z: 0, px: NaN, py: NaN, seed: 0, vmul: 1, colorIdx: 0, flashUntil: 0, nextFlash: 0 };
    }

    syncCount() {
        const count = Math.max(1, Math.floor(this.options.particleCount));
        if (this.stars.length === count) return;
        if (this.stars.length > count) {
            this.stars.length = count;
        } else {
            while (this.stars.length < count) {
                const s = this.makeStar();
                this.resetStar(s, true);
                this.stars.push(s);
            }
        }
    }

    resize(entry) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const cr = entry?.contentRect;
        const rectW = cr?.width || this.container.clientWidth || this.container.getBoundingClientRect().width;
        const rectH = cr?.height || this.container.clientHeight || this.container.getBoundingClientRect().height;
        const w = Math.max(1, Math.floor(rectW) || 600);
        const h = Math.max(1, Math.floor(rectH) || 400);

        if (this.size.w === w && this.size.h === h && this.size.dpr === dpr) return;

        this.size = { w, h, dpr };
        this.canvas.width = Math.floor(w * dpr);
        this.canvas.height = Math.floor(h * dpr);
        this.canvas.style.width = `${w}px`;
        this.canvas.style.height = `${h}px`;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.ctx.clearRect(0, 0, w, h);
    }

    drawFrame(deltaSec) {
        const c = this.cfg();
        this.syncCount();
        
        const { w, h } = this.size;
        const cx = w / 2;
        const cy = h / 2;
        const projScale = Math.min(w, h) * 0.9;
        const dt = Math.max(0.001, Math.min(0.1, deltaSec)) * 60;

        const keep = Math.pow(Math.min(0.98, Math.max(0, c.trail)), dt);
        const trailAlpha = Math.max(0.02, 1 - keep);
        
        this.ctx.globalAlpha = 1;
        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.fillStyle = `rgba(0, 0, 0, ${trailAlpha})`;
        this.ctx.fillRect(0, 0, w, h);

        this.ctx.globalCompositeOperation = "lighter";

        for (let i = 0; i < this.stars.length; i++) {
            const s = this.stars[i];
            const vz = c.stepZ * s.vmul * dt;
            
            if (c.reverse) {
                s.z += vz;
                if (s.z >= 1.0) { this.resetStar(s); continue; }
            } else {
                s.z -= vz;
                if (s.z <= c.focalDepth) { this.resetStar(s); continue; }
            }

            let tx = s.x;
            let ty = s.y;
            if (c.turbulence > 0) {
                const t = this.elapsed * 1.2 + s.seed;
                const amp = c.turbulence * (1 - s.z) * 0.25;
                tx += Math.sin(t + s.seed) * amp;
                ty += Math.cos(t * 1.13 + s.seed * 0.7) * amp;
            }

            const persp = c.focalDepth / Math.max(s.z, 0.0001);
            const sx = cx + tx * persp * projScale;
            const sy = cy + ty * persp * projScale;

            if (!c.reverse && (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20)) {
                this.resetStar(s);
                continue;
            }

            let flashMult = 1;
            if (c.glitter > 0) {
                if (this.elapsed >= s.nextFlash && s.flashUntil < this.elapsed) {
                    s.flashUntil = this.elapsed + 0.04 + Math.random() * 0.07;
                    s.nextFlash = this.elapsed + 1 + Math.random() * 4 * (1 / Math.max(0.0001, c.glitter));
                }
                if (this.elapsed <= s.flashUntil) flashMult = 1 + 2.5 * c.glitter;
            }

            const sizePersp = Math.min(2.5, (c.focalDepth / Math.max(s.z, 0.0001)) * 0.6);
            const baseR = Math.max(0.25, c.starScale * (0.4 + sizePersp));
            const maxR = 1 + c.starScale * 2.5;
            const r = Math.min(baseR * flashMult, maxR);

            const lifeT = c.reverse ? s.z : 1 - s.z;
            const fadeIn = c.reverse ? Math.min(1, (s.z - c.focalDepth) / (1 - c.focalDepth) / 0.12) : 1;
            const a = Math.min(1, c.reverse ? 0.85 - lifeT * 0.6 : lifeT * 0.9 + 0.05) * fadeIn * c.brightness * (flashMult > 1 ? 1 : 0.85);
            
            const colStr = this.rgbStrs[s.colorIdx];

            if (!Number.isNaN(s.px) && !Number.isNaN(s.py)) {
                this.ctx.globalAlpha = a * 0.5;
                this.ctx.strokeStyle = colStr;
                this.ctx.lineWidth = Math.max(0.4, r * 0.4);
                this.ctx.beginPath();
                this.ctx.moveTo(s.px, s.py);
                this.ctx.lineTo(sx, sy);
                this.ctx.stroke();
            }

            this.ctx.globalAlpha = a;
            this.ctx.fillStyle = colStr;
            this.ctx.fillRect(sx - r, sy - r, r * 2, r * 2);

            if (flashMult > 1) {
                const rf = Math.min(r * 1.4, maxR * 1.4);
                this.ctx.globalAlpha = a * 0.5;
                this.ctx.fillRect(sx - rf, sy - rf, rf * 2, rf * 2);
            }

            s.px = sx;
            s.py = sy;
        }

        this.ctx.globalAlpha = 1;
        this.ctx.globalCompositeOperation = "source-over";
        this.elapsed += Math.min(0.1, Math.max(0, deltaSec));
    }

    loop(t) {
        const deltaSec = (t - this.lastT) / 1000;
        this.lastT = t;
        this.drawFrame(deltaSec);
        this.rafId = requestAnimationFrame(this.loop.bind(this));
    }

    init() {
        this.syncCount();
        this.resize();

        this.ro = new ResizeObserver((entries) => this.resize(entries[0]));
        this.ro.observe(this.container);

        this.rafId = requestAnimationFrame(this.loop.bind(this));
    }

    destroy() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
        if (this.ro) this.ro.disconnect();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('glitter-canvas');
    if (canvas) {
        new GlitterWrap(canvas, { particleCount: 1000, starSize: 10, focalDepth: 5, trailAmount: 30 });
    }
});
