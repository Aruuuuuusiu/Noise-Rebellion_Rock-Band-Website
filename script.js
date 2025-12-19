// NOISE REBELLION - JavaScript Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
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
    
    // Gallery filter functionality
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
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('Welcome to the Rebellion! Check your email for confirmation.', 'success');
                this.reset();
            }
        });
    }
    
    // Music player simulation
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Simulate music playing
            this.innerHTML = '<i class="fas fa-pause"></i>';
            this.style.background = 'var(--secondary-color)';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-play"></i>';
                this.style.background = 'var(--primary-color)';
            }, 3000);
            
            showNotification('Now playing...', 'info');
        });
    });
    
    // Merch quick view
    document.querySelectorAll('.merch-overlay .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const merchItem = this.closest('.merch-item');
            const title = merchItem.querySelector('h3').textContent;
            const price = merchItem.querySelector('.price').textContent;
            
            showModal(`
                <h3>${title}</h3>
                <p>Price: ${price}</p>
                <p>This is a placeholder for the product details. In a real store, this would show size options, descriptions, and add to cart functionality.</p>
                <button class="btn-primary" onclick="closeModal()">Add to Cart</button>
                <button class="btn-secondary" onclick="closeModal()">Close</button>
            `);
        });
    });
    
    // Ticket button functionality
    document.querySelectorAll('.tour-date .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                const venue = this.closest('.tour-date').querySelector('.venue h3').textContent;
                showModal(`
                    <h3>Tickets for ${venue}</h3>
                    <p>This would redirect to a ticketing platform like Ticketmaster or Eventbrite.</p>
                    <button class="btn-primary" onclick="closeModal()">Buy Tickets</button>
                    <button class="btn-secondary" onclick="closeModal()">Close</button>
                `);
            }
        });
    });
    
    // Streaming link clicks
    document.querySelectorAll('.streaming-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent.trim();
            showNotification(`Opening ${platform}...`, 'info');
        });
    });
    
    // Social media links
    document.querySelectorAll('.social-icons a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split(' ')[1].replace('fa-', '');
            showNotification(`Opening ${platform}...`, 'info');
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-image');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.album-card, .video-card, .news-item, .merch-item, .tour-date, .member-card').forEach(el => {
        observer.observe(el);
    });
    
    // Glitch effect enhancement
    setInterval(() => {
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(el => {
            if (Math.random() > 0.95) {
                el.style.textShadow = `
                    ${Math.random() * 10}px ${Math.random() * 10}px var(--glitch-color-1),
                    ${Math.random() * -10}px ${Math.random() * -10}px var(--glitch-color-2)
                `;
                setTimeout(() => {
                    el.style.textShadow = '';
                }, 100);
            }
        });
    }, 2000);
    
    // Audio context for web audio (placeholder)
    let audioContext;
    
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    // Click sound effect
    document.addEventListener('click', function(e) {
        if (e.target.matches('button, .btn-primary, .btn-secondary, .nav-link')) {
            // Placeholder for click sound
            console.log('Click sound would play here');
        }
    });
});

// Utility functions

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
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
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
        background: ${type === 'success' ? 'var(--secondary-color)' : type === 'error' ? 'var(--primary-color)' : 'var(--dark-bg)'};
        color: ${type === 'success' || type === 'error' ? 'black' : 'white'};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 300px;
        transform: translateX(100%);
        transition: all 0.3s ease;
        border: 2px solid ${type === 'success' ? 'var(--secondary-color)' : type === 'error' ? 'var(--primary-color)' : 'var(--gray-text)'};
    `;
    
    // Style close button
    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function showModal(content) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: var(--dark-bg);
        border: 2px solid var(--primary-color);
        border-radius: 15px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
        position: relative;
        animation: fadeInUp 0.3s ease-out;
    `;
    
    modalContent.innerHTML = content;
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Close on overlay click
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
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
        }, 300);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + M for music section
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        scrollToSection('music');
    }
    
    // Alt + T for tour section
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        scrollToSection('tour');
    }
    
    // Alt + G for gallery section
    if (e.altKey && e.key === 'g') {
        e.preventDefault();
        scrollToSection('gallery');
    }
    
    // Alt + C for contact section
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        scrollToSection('contact');
    }
});

// Easter eggs
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated
        document.body.style.animation = 'glitch-flicker 0.1s infinite';
        showNotification('🎸 REBELLION MODE ACTIVATED! 🎸', 'success');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
        
        konamiCode = [];
    }
});

// Initialize everything when the page loads
window.addEventListener('load', function() {
    console.log('🎸 NOISE REBELLION WEBSITE LOADED 🎸');
    console.log('Use Alt+M for Music, Alt+T for Tour, Alt+G for Gallery, Alt+C for Contact');
    console.log('Try the Konami Code for a surprise! ↑↑↓↓←→←→BA');
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
});

