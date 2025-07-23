// JavaScript for Gallery Page

document.addEventListener('DOMContentLoaded', function() {
    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        
                        // Add animation class
                        item.classList.add('animate-item');
                        
                        // Remove animation class after animation completes
                        setTimeout(() => {
                            item.classList.remove('animate-item');
                        }, 500);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Lightbox Functionality
    const galleryZoomLinks = document.querySelectorAll('.gallery-zoom');
    const lightboxContainer = document.querySelector('.lightbox-container');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxCaptionTitle = document.querySelector('.lightbox-caption h3');
    const lightboxCaptionText = document.querySelector('.lightbox-caption p');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const galleryImages = [];
    
    if (galleryZoomLinks.length > 0 && lightboxContainer) {
        // Collect all gallery items data
        galleryZoomLinks.forEach((link, index) => {
            const galleryItem = link.closest('.gallery-item');
            const img = galleryItem.querySelector('img');
            const title = galleryItem.querySelector('.overlay-content h3').textContent;
            const desc = galleryItem.querySelector('.overlay-content p').textContent;
            
            galleryImages.push({
                src: img.src,
                title: title,
                desc: desc
            });
            
            // Open lightbox when clicking on gallery zoom link
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openLightbox(index);
            });
        });
        
        // Open lightbox function
        function openLightbox(index) {
            currentIndex = index;
            updateLightboxContent();
            lightboxContainer.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        }
        
        // Update lightbox content
        function updateLightboxContent() {
            const currentImage = galleryImages[currentIndex];
            lightboxImg.src = currentImage.src;
            lightboxImg.alt = currentImage.title;
            lightboxCaptionTitle.textContent = currentImage.title;
            lightboxCaptionText.textContent = currentImage.desc;
            
            // Add fade-in animation
            lightboxImg.classList.add('fade-in');
            setTimeout(() => {
                lightboxImg.classList.remove('fade-in');
            }, 300);
        }
        
        // Close lightbox
        lightboxClose.addEventListener('click', function() {
            lightboxContainer.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });
        
        // Close lightbox when clicking outside the image
        lightboxContainer.addEventListener('click', function(e) {
            if (e.target === lightboxContainer) {
                lightboxContainer.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
        
        // Navigate to previous image
        lightboxPrev.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxContent();
        });
        
        // Navigate to next image
        lightboxNext.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            updateLightboxContent();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightboxContainer.style.display === 'flex') {
                if (e.key === 'Escape') {
                    lightboxContainer.style.display = 'none';
                    document.body.style.overflow = ''; // Restore scrolling
                } else if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                    updateLightboxContent();
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % galleryImages.length;
                    updateLightboxContent();
                }
            }
        });
    }
    
    // Add CSS for animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-item {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.3s ease-in-out;
        }
    `;
    
    document.head.appendChild(animationStyle);
});