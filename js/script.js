document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // 1. MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // ============================================
    // 2. ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('.section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ============================================
    // 3. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // 4. IMAGE LIGHTBOX/MODAL FUNCTIONALITY
    // ============================================
    function initImageLightbox() {
        // Create modal if it doesn't exist
        let modal = document.querySelector('.modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <span class="modal-close">&times;</span>
                <span class="modal-nav modal-prev">&#10094;</span>
                <span class="modal-nav modal-next">&#10095;</span>
                <img class="modal-content" alt="Gallery Image">
            `;
            document.body.appendChild(modal);
        }

        const modalImg = modal.querySelector('.modal-content');
        const closeBtn = modal.querySelector('.modal-close');
        const prevBtn = modal.querySelector('.modal-prev');
        const nextBtn = modal.querySelector('.modal-next');
        
        let currentImages = [];
        let currentIndex = 0;

        // Function to open modal
        function openModal(images, index) {
            currentImages = images;
            currentIndex = index;
            showImage(currentIndex);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Function to show image at index
        function showImage(index) {
            if (currentImages.length > 0) {
                modalImg.src = currentImages[index].src;
                modalImg.alt = currentImages[index].alt || 'Gallery Image';
                
                // Show/hide navigation buttons
                prevBtn.style.display = currentImages.length > 1 ? 'block' : 'none';
                nextBtn.style.display = currentImages.length > 1 ? 'block' : 'none';
            }
        }

        // Close modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Navigate to previous image
        function prevImage() {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            showImage(currentIndex);
        }

        // Navigate to next image
        function nextImage() {
            currentIndex = (currentIndex + 1) % currentImages.length;
            showImage(currentIndex);
        }

        // Event listeners
        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'ArrowRight') nextImage();
            }
        });

        // Add click handlers to gallery images
        const galleryImages = document.querySelectorAll('.gallery-grid img, .gallery-item img, .projects-grid img[src*="pictures/"]');
        
        // Group images by their parent container
        const imageGroups = {};
        galleryImages.forEach(img => {
            const container = img.closest('.gallery-grid, .projects-grid, .section-container');
            const containerId = container ? Array.from(document.querySelectorAll('.gallery-grid, .projects-grid, .section-container')).indexOf(container) : 0;
            
            if (!imageGroups[containerId]) {
                imageGroups[containerId] = [];
            }
            imageGroups[containerId].push(img);
        });

        // Add click handlers
        galleryImages.forEach(img => {
            // Wrap img in a clickable container if not already wrapped
            if (!img.closest('.gallery-item')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'gallery-item';
                img.parentNode.insertBefore(wrapper, img);
                wrapper.appendChild(img);
            }

            const item = img.closest('.gallery-item');
            if (item) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => {
                    const container = img.closest('.gallery-grid, .projects-grid, .section-container');
                    const containerId = container ? Array.from(document.querySelectorAll('.gallery-grid, .projects-grid, .section-container')).indexOf(container) : 0;
                    const images = imageGroups[containerId] || [img];
                    const index = images.indexOf(img);
                    openModal(images, index);
                });
            }
        });
    }

    // Initialize lightbox
    initImageLightbox();

    // ============================================
    // 5. CANVAS ANIMATED BACKGROUND
    // ============================================
    const canvas = document.getElementById('gridCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let animationId;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resize);
        resize();

        const dots = [];
        const DOT_COUNT = Math.min(Math.floor((width * height) / 15000), 80); // Responsive dot count

        class Dot {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2.5 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) {
                    this.vx *= -1;
                    this.x = Math.max(0, Math.min(width, this.x));
                }
                if (this.y < 0 || this.y > height) {
                    this.vy *= -1;
                    this.y = Math.max(0, Math.min(height, this.y));
                }
            }

            draw() {
                ctx.fillStyle = '#cbd5e1';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize dots
        for (let i = 0; i < DOT_COUNT; i++) {
            dots.push(new Dot());
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            dots.forEach((dot, i) => {
                dot.update();
                dot.draw();
                
                // Draw connection lines to nearby dots
                for (let j = i + 1; j < dots.length; j++) {
                    const otherDot = dots[j];
                    const dx = dot.x - otherDot.x;
                    const dy = dot.y - otherDot.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        ctx.strokeStyle = `rgba(203, 213, 225, ${(1 - distance / 120) * 0.5})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(otherDot.x, otherDot.y);
                        ctx.stroke();
                    }
                }
            });
            
            animationId = requestAnimationFrame(animate);
        }

        // Start animation
        animate();

        // Pause animation when page is not visible (performance optimization)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animate();
            }
        });

        // Recreate dots on resize
        window.addEventListener('resize', () => {
            const newDotCount = Math.min(Math.floor((width * height) / 15000), 80);
            while (dots.length < newDotCount) {
                dots.push(new Dot());
            }
            while (dots.length > newDotCount) {
                dots.pop();
            }
        });
    }

    // ============================================
    // 6. SCROLL TO TOP BUTTON
    // ============================================
    let scrollTopBtn = document.querySelector('.scroll-top');
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = '↑';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollTopBtn);
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // 7. LAZY LOADING FOR IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            img.classList.add('lazy-load');
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }

    // ============================================
    // 8. SMOOTH REVEAL ANIMATIONS ON SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category, .education-card');
    
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(el);
        });
    }

    // ============================================
    // 9. FORM VALIDATION (if contact form exists)
    // ============================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[name="name"]');
            const email = contactForm.querySelector('input[name="email"]');
            const message = contactForm.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            // Simple validation
            if (name && name.value.trim() === '') {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            if (email && !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }
            
            if (message && message.value.trim() === '') {
                showError(message, 'Please enter a message');
                isValid = false;
            }
            
            if (isValid) {
                // Form is valid, you can submit it here
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let error = formGroup.querySelector('.error-message');
        
        if (!error) {
            error = document.createElement('span');
            error.className = 'error-message';
            error.style.color = 'red';
            error.style.fontSize = '0.85rem';
            error.style.marginTop = '5px';
            error.style.display = 'block';
            formGroup.appendChild(error);
        }
        
        error.textContent = message;
        input.style.borderColor = 'red';
        
        setTimeout(() => {
            error.textContent = '';
            input.style.borderColor = '';
        }, 3000);
    }


});