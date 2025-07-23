// JavaScript for Contact Page

document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    const sendAnotherBtn = document.getElementById('sendAnotherBtn');
    
    if (contactForm && formSuccessMessage && sendAnotherBtn) {
        // Form Validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Basic validation
            let isValid = true;
            
            // Validate name
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                removeError(name);
            }
            
            // Validate email
            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(email);
            }
            
            // Validate subject
            if (subject.value.trim() === '') {
                showError(subject, 'Subject is required');
                isValid = false;
            } else {
                removeError(subject);
            }
            
            // Validate message
            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                removeError(message);
            }
            
            // If form is valid, submit it
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll just show the success message
                
                // Show success message with animation
                formSuccessMessage.style.display = 'flex';
                setTimeout(() => {
                    formSuccessMessage.classList.add('show');
                }, 10);
                
                // Reset form
                contactForm.reset();
            }
        });
        
        // Send Another Message button
        sendAnotherBtn.addEventListener('click', function() {
            // Hide success message with animation
            formSuccessMessage.classList.remove('show');
            setTimeout(() => {
                formSuccessMessage.style.display = 'none';
            }, 300);
        });
        
        // Helper function to show error message
        function showError(input, message) {
            const formGroup = input.parentElement;
            let errorElement = formGroup.querySelector('.error-message');
            
            // Create error message element if it doesn't exist
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            
            // Set error message and add error class to input
            errorElement.textContent = message;
            input.classList.add('error');
        }
        
        // Helper function to remove error message
        function removeError(input) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message');
            
            // Remove error message if it exists
            if (errorElement) {
                formGroup.removeChild(errorElement);
            }
            
            // Remove error class from input
            input.classList.remove('error');
        }
        
        // Helper function to validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Add CSS for form validation
        const validationStyle = document.createElement('style');
        validationStyle.textContent = `
            .error-message {
                color: #e74c3c;
                font-size: 1.4rem;
                margin-top: 0.5rem;
            }
            
            .form-group input.error,
            .form-group textarea.error,
            .form-group select.error {
                border-color: #e74c3c;
            }
        `;
        
        document.head.appendChild(validationStyle);
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Toggle active class on clicked item
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // If the clicked item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.contact-info-card, .contact-form, .faq-item');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                // Add delay based on index for staggered animation
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, index * 100);
            }
        });
    };
    
    // Add CSS for scroll animations
    const scrollAnimationStyle = document.createElement('style');
    scrollAnimationStyle.textContent = `
        .contact-info-card, .contact-form, .faq-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .contact-info-card:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .contact-info-card:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .contact-info-card:nth-child(4) {
            transition-delay: 0.3s;
        }
    `;
    
    document.head.appendChild(scrollAnimationStyle);
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});