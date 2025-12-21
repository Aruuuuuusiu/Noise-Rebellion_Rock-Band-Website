document.addEventListener('DOMContentLoaded', function() {

    // NAVIGATION FUNCTIONALITY
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Navbar scroll effect with throttle
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // GALLERY FILTER FUNCTIONALITY
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // NEWSLETTER FORM SUBMISSION
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type=\"email\"]');
            const email = emailInput.value;
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (email) {
                showNotification('🎸 Welcome to the Rebellion! Check your email for confirmation.', 'success');
                this.reset();
            }
        });
    }
    
    // MUSIC PLAYER SIMULATION
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Reset all other play buttons
            document.querySelectorAll('.play-btn').forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.innerHTML = '<i class=\"fas fa-play\"></i>';
                    otherBtn.classList.remove('playing');
                }
            });
            
            // Toggle play/pause
            if (this.classList.contains('playing')) {
                this.innerHTML = '<i class=\"fas fa-play\"></i>';
                this.classList.remove('playing');
                showNotification('Playback stopped', 'info');
            } else {
                this.innerHTML = '<i class=\"fas fa-pause\"></i>';
                this.classList.add('playing');
                showNotification('🎵 Now playing...', 'info');
                
                // Auto-reset after 3 seconds (simulated playback)
                setTimeout(() => {
                    if (this.classList.contains('playing')) {
                        this.innerHTML = '<i class=\"fas fa-play\"></i>';
                        this.classList.remove('playing');
                    }
                }, 3000);
            }
        });
    });
    
    // MERCH QUICK VIEW
    document.querySelectorAll('.merch-overlay .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const merchItem = this.closest('.merch-item');
            const title = merchItem.querySelector('h3').textContent;
            const price = merchItem.querySelector('.price').textContent;
            const description = merchItem.querySelector('.merch-description').textContent;
            
            showModal(`
                <div style="text-align: center;">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem; font-size: 1.8rem;">${title}</h3>
                    <p style="font-size: 2rem; color: var(--primary-color); font-weight: bold; margin-bottom: 0.5rem;">${price}</p>
                    <p style="color: var(--gray-text); margin-bottom: 1.5rem;">${description}</p>
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; flex-wrap: wrap;">
                        <button class="btn-primary" onclick="addToCart(); closeModal();" style="padding: 1rem 2rem;">
                            <i class="fas fa-shopping-cart"></i> ADD TO CART
                        </button>
                        <button class="btn-secondary" onclick="closeModal()" style="padding: 1rem 2rem;">CLOSE</button>
                    </div>
                </div>
            `);
        });
    });
    
    // TICKET BUTTON FUNCTIONALITY
    document.querySelectorAll('.tour-date .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                const tourDate = this.closest('.tour-date');
                const venue = tourDate.querySelector('.venue h3').textContent;
                const location = tourDate.querySelector('.venue p').textContent;
                const date = tourDate.querySelector('.date span').textContent;
                const month = tourDate.querySelector('.date').textContent.split('<')[0];
                
                showModal(`
                    <div style="text-align: center;">
                        <h3 style="color: var(--secondary-color); margin-bottom: 1rem; font-size: 2rem;">${venue}</h3>
                        <p style="color: var(--gray-text); margin-bottom: 0.5rem; font-size: 1.1rem;">${location}</p>
                        <p style="color: var(--primary-color); margin-bottom: 2rem; font-size: 1.2rem; font-weight: bold;">${month} ${date}, 2024</p>
                        <p style="color: var(--light-text); margin-bottom: 2rem;">This would redirect to a ticketing platform like Ticketmaster or Eventbrite.</p>
                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                            <button class="btn-primary" onclick="closeModal()" style="padding: 1rem 2rem;">
                                <i class="fas fa-ticket-alt"></i> BUY TICKETS
                            </button>
                            <button class="btn-secondary" onclick="closeModal()" style="padding: 1rem 2rem;">CLOSE</button>
                        </div>
                    </div>
                `);
            }
        });
    });
    
    // STREAMING LINK CLICKS
    document.querySelectorAll('.streaming-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent.trim() || this.querySelector('i').className.split(' ')[1].replace('fa-', '');
            showNotification(`Opening ${platform}...`, 'info');
        });
    });
    
    // SOCIAL MEDIA LINKS
    document.querySelectorAll('.social-icons a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split(' ')[1].replace('fa-', '');
            showNotification(`Opening ${platform}...`, 'info');
        });
    });
    
    // PARALLAX EFFECT FOR HERO SECTION
    let parallaxTicking = false;
    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('.hero-image');
                if (parallax && scrolled < window.innerHeight) {
                    const speed = scrolled * 0.4;
                    parallax.style.transform = `translateY(${speed}px)`;
                }
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    });
    
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.album-card, .video-card, .news-item, .merch-item, .tour-date, .member-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // ENHANCED GLITCH EFFECT
    setInterval(() => {
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(el => {
            if (Math.random() > 0.96) {
                el.style.textShadow = `
                    ${Math.random() * 8}px ${Math.random() * 8}px var(--glitch-color-1),
                    ${Math.random() * -8}px ${Math.random() * -8}px var(--glitch-color-2),
                    0 0 20px var(--primary-color)
                `;
                setTimeout(() => {
                    el.style.textShadow = '';
                }, 80);
            }
        });
    }, 2500);
    
    // KEYBOARD SHORTCUTS
    document.addEventListener('keydown', function(e) {
        // Alt + M for music section
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            scrollToSection('music');
            showNotification('Navigated to Music section', 'info');
        }
        
        // Alt + T for tour section
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            scrollToSection('tour');
            showNotification('Navigated to Tour section', 'info');
        }
        
        // Alt + G for gallery section
        if (e.altKey && e.key === 'g') {
            e.preventDefault();
            scrollToSection('gallery');
            showNotification('Navigated to Gallery section', 'info');
        }
        
        // Alt + C for contact section
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            scrollToSection('contact');
            showNotification('Navigated to Contact section', 'info');
        }
        
        // Escape to close modal
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // EASTER EGG - KONAMI CODE
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            // Easter egg activated
            activateRebellionMode();
            konamiCode = [];
        }
    });
    
    // INITIALIZE ON LOAD
    window.addEventListener('load', function() {
        console.log('%c🎸 NOISE REBELLION WEBSITE LOADED 🎸', 'color: #ff0040; font-size: 20px; font-weight: bold;');
        console.log('%cKeyboard Shortcuts:', 'color: #00ff80; font-size: 14px; font-weight: bold;');
        console.log('Alt+M → Music | Alt+T → Tour | Alt+G → Gallery | Alt+C → Contact');
        console.log('%cTry the Konami Code for a surprise! ↑↑↓↓←→←→BA', 'color: #ff3366; font-style: italic;');
        
        // Add loading complete class to body
        document.body.classList.add('loaded');
    });
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    let bgColor = 'var(--card-bg)';
    let borderColor = 'var(--gray-text)';
    
    if (type === 'success') {
        icon = 'check-circle';
        bgColor = 'rgba(0, 255, 128, 0.1)';
        borderColor = 'var(--secondary-color)';
    } else if (type === 'error') {
        icon = 'times-circle';
        bgColor = 'rgba(255, 0, 64, 0.1)';
        borderColor = 'var(--primary-color)';
    }
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="close-btn">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        backdrop-filter: blur(20px);
        color: white;
        padding: 1.2rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 320px;
        max-width: 400px;
        transform: translateX(450px);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border: 2px solid ${borderColor};
        font-family: var(--font-body);
    `;
    
    // Style icon
    const iconElement = notification.querySelector('i.fas:first-child');
    iconElement.style.cssText = `
        font-size: 1.5rem;
        color: ${borderColor};
    `;
    
    // Style message
    const messageElement = notification.querySelector('span');
    messageElement.style.cssText = `
        flex: 1;
        color: var(--light-text);
        font-size: 0.95rem;
        line-height: 1.4;
    `;
    
    // Style close button
    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: var(--gray-text);
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
        transition: color 0.2s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.color = 'var(--light-text)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.color = 'var(--gray-text)';
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(450px)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function showModal(content) {
    // Close any existing modal
    closeModal();
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: var(--card-bg);
        border: 2px solid var(--primary-color);
        border-radius: 16px;
        padding: 2.5rem;
        max-width: 550px;
        width: 90%;
        position: relative;
        animation: slideUp 0.3s ease-out;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    
    modalContent.innerHTML = content;
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Close on overlay click
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 200);
    }
}

function addToCart() {
    showNotification('🛒 Item added to cart!', 'success');
}

function activateRebellionMode() {
    // Easter egg - Rebellion mode
    document.body.style.animation = 'glitch-flicker 0.1s infinite';
    
    // Apply random colors to sections
    const sections = document.querySelectorAll('.section');
    let colorIndex = 0;
    const colors = ['#ff0040', '#00ff80', '#0066ff', '#9933ff'];
    
    sections.forEach(section => {
        section.style.borderTop = `5px solid ${colors[colorIndex % colors.length]}`;
        colorIndex++;
    });
    
    showNotification('🎸 REBELLION MODE ACTIVATED! 🎸', 'success');
    
    setTimeout(() => {
        document.body.style.animation = '';
        sections.forEach(section => {
            section.style.borderTop = '';
        });
    }, 5000);
}

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
