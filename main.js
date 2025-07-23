// Main JavaScript for Paldima Resources Limited Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialSlider && prevBtn && nextBtn) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        
        // Calculate the width to scroll
        const getScrollAmount = () => {
            if (window.innerWidth < 768) {
                return testimonialSlider.scrollWidth / testimonialCards.length;
            } else {
                return testimonialSlider.scrollWidth / 3;
            }
        };
        
        // Scroll to the next testimonial
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            testimonialSlider.scrollTo({
                left: currentIndex * getScrollAmount(),
                behavior: 'smooth'
            });
        });
        
        // Scroll to the previous testimonial
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            testimonialSlider.scrollTo({
                left: currentIndex * getScrollAmount(),
                behavior: 'smooth'
            });
        });
        
        // Auto scroll testimonials
        let autoScrollInterval;
        
        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                testimonialSlider.scrollTo({
                    left: currentIndex * getScrollAmount(),
                    behavior: 'smooth'
                });
            }, 5000); // Change testimonial every 5 seconds
        };
        
        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };
        
        // Start auto scroll
        startAutoScroll();
        
        // Stop auto scroll when user interacts with the slider
        testimonialSlider.addEventListener('mouseenter', stopAutoScroll);
        testimonialSlider.addEventListener('mouseleave', startAutoScroll);
        prevBtn.addEventListener('mouseenter', stopAutoScroll);
        nextBtn.addEventListener('mouseenter', stopAutoScroll);
        prevBtn.addEventListener('mouseleave', startAutoScroll);
        nextBtn.addEventListener('mouseleave', startAutoScroll);
    }
    
    // Sticky Header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.padding = '5px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '';
                header.style.boxShadow = '';
            }
            
            // Hide header when scrolling down, show when scrolling up
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.top = '-100px';
            } else {
                header.style.top = '0';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    };
    
    const animateOnScroll = () => {
        animateElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});