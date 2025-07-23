// JavaScript for About Page

document.addEventListener('DOMContentLoaded', function() {
    // Testimonials Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelector('.testimonial-dots');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    let currentSlide = 0;
    let slideInterval;
    const autoSlideDelay = 5000; // 5 seconds
    
    // Initialize testimonial slider if elements exist
    if (testimonialSlides.length > 0 && testimonialDots && prevButton && nextButton) {
        // Create dots for each slide
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            testimonialDots.appendChild(dot);
        });
        
        const dots = testimonialDots.querySelectorAll('.dot');
        
        // Show the first slide
        showSlide(currentSlide);
        
        // Start auto sliding
        startAutoSlide();
        
        // Previous button click
        prevButton.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            resetAutoSlide();
        });
        
        // Next button click
        nextButton.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            resetAutoSlide();
        });
        
        // Function to show a specific slide
        function showSlide(index) {
            // Handle index bounds
            if (index < 0) index = testimonialSlides.length - 1;
            if (index >= testimonialSlides.length) index = 0;
            
            // Update current slide index
            currentSlide = index;
            
            // Hide all slides
            testimonialSlides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            // Show the current slide with fade-in animation
            testimonialSlides[currentSlide].style.display = 'block';
            testimonialSlides[currentSlide].classList.add('fade-in');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                testimonialSlides[currentSlide].classList.remove('fade-in');
            }, 500);
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Function to go to a specific slide
        function goToSlide(index) {
            showSlide(index);
        }
        
        // Function to start auto sliding
        function startAutoSlide() {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, autoSlideDelay);
        }
        
        // Function to reset auto slide timer
        function resetAutoSlide() {
            clearInterval(slideInterval);
            startAutoSlide();
        }
        
        // Pause auto sliding when hovering over the slider
        document.querySelector('.testimonials-slider').addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // Resume auto sliding when mouse leaves the slider
        document.querySelector('.testimonials-slider').addEventListener('mouseleave', () => {
            startAutoSlide();
        });
        
        // Add CSS for animations
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            .testimonial-slide {
                display: none;
            }
            
            .fade-in {
                animation: fadeIn 0.5s ease-in-out;
            }
            
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            
            .testimonial-dots .dot {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: #ccc;
                margin: 0 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            .testimonial-dots .dot.active {
                background-color: var(--primary-color);
                transform: scale(1.2);
            }
        `;
        
        document.head.appendChild(animationStyle);
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.story-image, .story-text, .value-card, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-in');
            }
        });
    };
    
    // Add CSS for scroll animations
    const scrollAnimationStyle = document.createElement('style');
    scrollAnimationStyle.textContent = `
        .story-image, .story-text, .value-card, .team-member {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .value-card:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .value-card:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .value-card:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .value-card:nth-child(5) {
            transition-delay: 0.4s;
        }
        
        .value-card:nth-child(6) {
            transition-delay: 0.5s;
        }
        
        .team-member:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .team-member:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .team-member:nth-child(4) {
            transition-delay: 0.3s;
        }
    `;
    
    document.head.appendChild(scrollAnimationStyle);
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});