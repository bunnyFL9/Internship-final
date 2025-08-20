// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to alumni cards
    const alumniCards = document.querySelectorAll('.alumni-card');
    alumniCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click functionality
        card.addEventListener('click', function() {
            const year = this.querySelector('.year').textContent;
            if(year === "2025") { window.location.href = "university.html"; } else { alert(`Viewing ${year} Internship Alumni Project`); }
        });
    });

    // Add notification functionality
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            // Create notification popup
            const notification = document.createElement('div');
            notification.className = 'notification-popup';
            notification.innerHTML = `
                <div class="notification-content">
                    <h4>Notifications</h4>
                    <p>No new notifications</p>
                    <button class="close-notification">×</button>
                </div>
            `;
            
            // Add styles
            notification.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1001;
                min-width: 300px;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            // Close notification
            const closeBtn = notification.querySelector('.close-notification');
            closeBtn.addEventListener('click', function() {
                notification.remove();
            });
            
            // Auto close after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 5000);
        });
    }

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.alumni-card, .gallery-item, .description-section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS for notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .notification-content h4 {
            margin: 0 0 10px 0;
            color: #333;
        }
        
        .notification-content p {
            margin: 0 0 15px 0;
            color: #666;
        }
        
        .close-notification {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #999;
        }
        
        .close-notification:hover {
            color: #333;
        }
    `;
    document.head.appendChild(style);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add responsive navigation toggle for mobile
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.navigation');
            if (!nav.querySelector('.mobile-toggle')) {
                const toggle = document.createElement('button');
                toggle.className = 'mobile-toggle';
                toggle.innerHTML = '<i class="fas fa-bars"></i>';
                toggle.style.cssText = `
                    display: none;
                    background: none;
                    border: none;
                    font-size: 24px;
                    color: #333;
                    cursor: pointer;
                `;
                
                nav.insertBefore(toggle, nav.firstChild);
                
                toggle.addEventListener('click', function() {
                    const menu = nav.querySelector('.nav-menu');
                    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
                });
            }
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Alumni data is now handled by alumni.js which fetches from local servers
    console.log('Alumni data loading handled by AlumniManager');
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-image');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add search functionality (placeholder)
function searchAlumni(query) {
    console.log('Searching for:', query);
    // Implement search functionality here
}

// Add filter functionality (placeholder)
function filterByYear(year) {
    console.log('Filtering by year:', year);
    // Implement filter functionality here
}
