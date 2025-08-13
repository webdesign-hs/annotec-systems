// Annotec Systems - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link (but not dropdown triggers)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // Don't close menu if it's a dropdown trigger
                const isDropdownTrigger = link.parentElement.classList.contains('has-dropdown');
                if (!isDropdownTrigger) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Smooth Scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        if (scrollTop > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 40px rgba(139, 195, 74, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(139, 195, 74, 0.2)';
        });
    });
    
    // Mobile dropdown functionality with smooth accordion
    const hasDropdowns = document.querySelectorAll('.has-dropdown');
    hasDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (link && dropdownMenu) {
            // Add click handler for the plus/minus toggle area
            const toggleArea = document.createElement('span');
            toggleArea.style.cssText = 'position: absolute; right: 0; top: 0; bottom: 0; width: 40px; cursor: pointer; z-index: 10;';
            link.style.position = 'relative';
            link.appendChild(toggleArea);
            
            toggleArea.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    hasDropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                            otherDropdown.classList.remove('active');
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            if (otherMenu) {
                                otherMenu.style.maxHeight = '0';
                            }
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                    
                    // Smooth height animation
                    if (dropdown.classList.contains('active')) {
                        dropdownMenu.style.display = 'block';
                        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
                    } else {
                        dropdownMenu.style.maxHeight = '0';
                        setTimeout(() => {
                            if (!dropdown.classList.contains('active')) {
                                dropdownMenu.style.display = 'none';
                            }
                        }, 300);
                    }
                }
            });
        }
    });
    
    // Lightbox functionality
    const lightboxImages = document.querySelectorAll('[onclick*="openLightbox"]');
    if (lightboxImages.length > 0) {
        // Create lightbox HTML
        const lightboxHTML = `
            <div id="lightbox" class="lightbox">
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img class="lightbox-image" src="" alt="">
                    <div class="lightbox-caption"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        
        // Lightbox CSS
        const lightboxCSS = `
            .lightbox {
                display: none;
                position: fixed;
                z-index: 9999;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.9);
            }
            .lightbox-content {
                margin: auto;
                display: block;
                width: 80%;
                max-width: 700px;
                position: relative;
                top: 50%;
                transform: translateY(-50%);
            }
            .lightbox-close {
                position: absolute;
                top: 15px;
                right: 35px;
                color: #f1f1f1;
                font-size: 40px;
                font-weight: bold;
                transition: 0.3s;
                cursor: pointer;
                z-index: 10000;
            }
            .lightbox-close:hover,
            .lightbox-close:focus {
                color: #bbb;
                text-decoration: none;
                cursor: pointer;
            }
            .lightbox-image {
                width: 100%;
                height: auto;
                border-radius: 8px;
            }
            .lightbox-caption {
                margin: auto;
                display: block;
                width: 80%;
                max-width: 700px;
                text-align: center;
                color: #ccc;
                padding: 10px 0;
                height: 150px;
            }
            @media (max-width: 768px) {
                .lightbox-content {
                    width: 95%;
                }
                .lightbox-close {
                    top: 10px;
                    right: 20px;
                    font-size: 30px;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = lightboxCSS;
        document.head.appendChild(style);
    }
    
});

// Global lightbox function
function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    
    if (lightbox && lightboxImage && lightboxCaption) {
        lightboxImage.src = imageSrc;
        lightboxCaption.innerHTML = caption;
        lightbox.style.display = 'block';
        
        // Close lightbox when clicking on close button or outside image
        const closeBtn = document.querySelector('.lightbox-close');
        closeBtn.onclick = function() {
            lightbox.style.display = 'none';
        }
        
        lightbox.onclick = function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        }
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            }
        });
    }
}