// JavaScript for Products Page

document.addEventListener('DOMContentLoaded', function() {
    // Product Filtering
    const filterBtn = document.querySelector('.filter-btn');
    const categoryFilter = document.getElementById('category-filter');
    const roomFilter = document.getElementById('room-filter');
    const colorFilter = document.getElementById('color-filter');
    const sizeFilter = document.getElementById('size-filter');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterBtn && categoryFilter && roomFilter && colorFilter && sizeFilter) {
        filterBtn.addEventListener('click', function() {
            const selectedCategory = categoryFilter.value;
            const selectedRoom = roomFilter.value;
            const selectedColor = colorFilter.value;
            const selectedSize = sizeFilter.value;
            
            productCards.forEach(card => {
                const cardCategory = card.dataset.category;
                const cardRoom = card.dataset.room;
                const cardColor = card.dataset.color;
                const cardSize = card.dataset.size;
                
                // Check if the card matches all selected filters
                const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
                const matchesRoom = selectedRoom === 'all' || cardRoom.includes(selectedRoom);
                const matchesColor = selectedColor === 'all' || cardColor.includes(selectedColor);
                const matchesSize = selectedSize === 'all' || cardSize === selectedSize;
                
                // Show or hide the card based on filter matches
                if (matchesCategory && matchesRoom && matchesColor && matchesSize) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Scroll to the top of the products section
            const productsSection = document.querySelector('.products-section');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Quick View Functionality
    const quickViewLinks = document.querySelectorAll('.product-overlay .btn-text');
    
    quickViewLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product information from the card
            const productCard = this.closest('.product-card');
            const productImg = productCard.querySelector('.product-img img').src;
            const productTitle = productCard.querySelector('h3').textContent;
            const productDesc = productCard.querySelector('.product-desc').textContent;
            const productSize = productCard.querySelector('.product-size').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Create modal HTML
            const modalHTML = `
                <div class="quick-view-modal">
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <div class="modal-body">
                            <div class="modal-img">
                                <img src="${productImg}" alt="${productTitle}">
                            </div>
                            <div class="modal-info">
                                <h2>${productTitle}</h2>
                                <p class="modal-desc">${productDesc}</p>
                                <div class="modal-meta">
                                    <p><strong>Size:</strong> ${productSize}</p>
                                    <p><strong>Price:</strong> ${productPrice}</p>
                                </div>
                                <div class="modal-actions">
                                    <button class="btn btn-primary">Request Quote</button>
                                    <button class="btn btn-secondary">Add to Wishlist</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Append modal to body
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Get the modal element
            const modal = document.querySelector('.quick-view-modal');
            const closeModal = document.querySelector('.close-modal');
            
            // Show modal
            modal.style.display = 'flex';
            
            // Close modal when clicking the close button
            closeModal.addEventListener('click', function() {
                modal.remove();
            });
            
            // Close modal when clicking outside the modal content
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
            
            // Close modal when pressing Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal) {
                    modal.remove();
                }
            });
        });
    });
    
    // Add CSS for Quick View Modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .quick-view-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        }
        
        .modal-content {
            background-color: white;
            border-radius: 8px;
            max-width: 900px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            color: #333;
            z-index: 10;
        }
        
        .modal-body {
            display: flex;
            flex-wrap: wrap;
        }
        
        .modal-img {
            flex: 0 0 50%;
            max-width: 50%;
        }
        
        .modal-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }
        
        .modal-info {
            flex: 0 0 50%;
            max-width: 50%;
            padding: 30px;
        }
        
        .modal-info h2 {
            margin-bottom: 15px;
            color: #2c3e50;
        }
        
        .modal-desc {
            margin-bottom: 20px;
            color: #555;
        }
        
        .modal-meta {
            margin-bottom: 30px;
        }
        
        .modal-meta p {
            margin-bottom: 10px;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
        }
        
        @media (max-width: 768px) {
            .modal-body {
                flex-direction: column;
            }
            
            .modal-img, .modal-info {
                flex: 0 0 100%;
                max-width: 100%;
            }
            
            .modal-img img {
                border-radius: 8px 8px 0 0;
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(modalStyle);
    
    // Smooth scrolling for category links
    const categoryLinks = document.querySelectorAll('a[href^="#"]');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const filtersHeight = document.querySelector('.product-filters').offsetHeight;
                const offset = headerHeight + filtersHeight + 20;
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});