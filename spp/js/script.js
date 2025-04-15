document.addEventListener('DOMContentLoaded', function() {
    // Image Data
    const images = [
        { id: 1, src: 'img/1.jpeg', title: 'Protest in Frankfurt', date: '2023-06-15', location: 'Frankfurt, Germany', category: 'politics' },
        { id: 2, src: 'img/2.jpg', title: 'Cultural Festival', date: '2023-07-22', location: 'Berlin, Germany', category: 'culture' },
        { id: 3, src: 'img/3.jpg', title: 'Political Rally', date: '2023-08-10', location: 'Munich, Germany', category: 'politics' },
        { id: 4, src: 'img/4.jpg', title: 'Environmental Protest', date: '2023-09-05', location: 'Hamburg, Germany', category: 'environment' },
        { id: 5, src: 'img/5.jpg', title: 'Sports Championship', date: '2023-10-12', location: 'Cologne, Germany', category: 'sports' },
        { id: 6, src: 'img/6.jpg', title: 'Urban Life', date: '2023-11-18', location: 'Dresden, Germany', category: 'society' },
        { id: 7, src: 'img/7.jpeg', title: 'Medical Conference', date: '2023-12-01', location: 'Düsseldorf, Germany', category: 'health' },
        { id: 8, src: 'img/8.jpeg', title: 'Technology Expo', date: '2024-01-15', location: 'Stuttgart, Germany', category: 'technology' },
        { id: 9, src: 'img/9.jpeg', title: 'Economic Forum', date: '2024-02-20', location: 'Bonn, Germany', category: 'economy' },
        { id: 10, src: 'img/10.jpg', title: 'Education Summit', date: '2024-03-05', location: 'Leipzig, Germany', category: 'education' },
        { id: 11, src: 'img/11.jpg', title: 'Art Exhibition', date: '2024-03-25', location: 'Frankfurt, Germany', category: 'culture' },
        { id: 12, src: 'img/12.jpg', title: 'Climate Protest', date: '2024-04-10', location: 'Berlin, Germany', category: 'environment' },
        { id: 13, src: 'img/13.jpg', title: 'Election Campaign', date: '2024-04-20', location: 'Munich, Germany', category: 'politics' },
        { id: 14, src: 'img/14.jpg', title: 'Music Festival', date: '2024-05-01', location: 'Hamburg, Germany', category: 'culture' },
        { id: 15, src: 'img/15.jpg', title: 'Refugee Aid', date: '2024-05-15', location: 'Cologne, Germany', category: 'humanitarian' },
        { id: 16, src: 'img/16.jpg', title: 'Urban Development', date: '2024-05-22', location: 'Dresden, Germany', category: 'society' },
        { id: 17, src: 'img/17.jpg', title: 'Healthcare Reform Protest', date: '2024-06-01', location: 'Düsseldorf, Germany', category: 'health' },
        { id: 18, src: 'img/18.jpg', title: 'Tech Conference', date: '2024-06-10', location: 'Stuttgart, Germany', category: 'technology' },
        { id: 19, src: 'img/19.jpg', title: 'Financial Summit', date: '2024-06-15', location: 'Bonn, Germany', category: 'economy' },
        { id: 20, src: 'img/20.jpeg', title: 'Education Reform', date: '2024-06-20', location: 'Leipzig, Germany', category: 'education' }
    ];

    // Site Language
    let currentLanguage = 'en';
    
    // Shopping Cart
    let cart = JSON.parse(localStorage.getItem('sppCart')) || [];
    updateCartCount();

    // Populate Gallery
    populateGallery(images);

    // Filter Buttons Event Listeners for desktop
    document.querySelectorAll('.filter-buttons .btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelector('.filter-buttons .btn.active').classList.remove('active');
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            let sortedImages = [...images];
            
            if (filter === 'recent') {
                sortedImages.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else {
                sortedImages.sort((a, b) => new Date(a.date) - new Date(b.date));
            }
            
            populateGallery(sortedImages);
        });
    });
    
    // Filter Dropdown Event Listener for mobile
    const filterSelect = document.getElementById('filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const filter = this.value;
            let sortedImages = [...images];
            
            // Update the hidden buttons state to stay in sync
            if (filter === 'recent') {
                document.getElementById('recent-filter').classList.add('active');
                document.getElementById('oldest-filter').classList.remove('active');
                sortedImages.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else {
                document.getElementById('oldest-filter').classList.add('active');
                document.getElementById('recent-filter').classList.remove('active');
                sortedImages.sort((a, b) => new Date(a.date) - new Date(b.date));
            }
            
            populateGallery(sortedImages);
        });
    }

    // Language Toggle
    document.getElementById('lang-en').addEventListener('click', function() {
        if (currentLanguage !== 'en') {
            setLanguage('en');
        }
    });

    document.getElementById('lang-de').addEventListener('click', function() {
        if (currentLanguage !== 'de') {
            setLanguage('de');
        }
    });

    // Functions
    function populateGallery(imagesArray) {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';
        
        imagesArray.forEach(image => {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 col-12';
            
            const date = new Date(image.date);
            const formattedDate = date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            col.innerHTML = `
                <div class="gallery-item">
                    <img src="${image.src}" alt="${image.title}">
                    <div class="gallery-overlay">
                        <h5>${image.title}</h5>
                        <p>${formattedDate} | ${image.location}</p>
                    </div>
                    <div class="add-to-cart" data-id="${image.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                </div>
            `;
            
            gallery.appendChild(col);
            
            // Add click event to open image detail
            col.querySelector('img').addEventListener('click', function() {
                window.location.href = `detail.html?id=${image.id}`;
            });
            
            // Add to cart functionality
            col.querySelector('.add-to-cart').addEventListener('click', function(e) {
                e.stopPropagation();
                const id = this.getAttribute('data-id');
                addToCart(parseInt(id));
            });
        });
    }

    function addToCart(imageId) {
        const image = images.find(img => img.id === imageId);
        
        if (!cart.some(item => item.id === imageId)) {
            cart.push({
                id: image.id,
                title: image.title,
                src: image.src,
                price: 25.00 // Default price for all images
            });
            
            localStorage.setItem('sppCart', JSON.stringify(cart));
            updateCartCount();
            
            // Show notification
            showNotification(currentLanguage === 'en' ? 'Added to cart!' : 'Zum Warenkorb hinzugefügt!');
        } else {
            showNotification(currentLanguage === 'en' ? 'Already in cart!' : 'Bereits im Warenkorb!');
        }
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.length;
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerText = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 2000);
    }

    function setLanguage(lang) {
        currentLanguage = lang;
        
        // Update UI elements based on language
        if (lang === 'en') {
            document.getElementById('lang-en').classList.add('active');
            document.getElementById('lang-de').classList.remove('active');
            // Update text elements
            updateTextElements('en');
        } else {
            document.getElementById('lang-de').classList.add('active');
            document.getElementById('lang-en').classList.remove('active');
            // Update text elements
            updateTextElements('de');
        }
        
        // Sync dropdown with active filter button
        const activeFilterButton = document.querySelector('.filter-buttons .btn.active');
        if (activeFilterButton) {
            const activeFilter = activeFilterButton.getAttribute('data-filter');
            const filterSelect = document.getElementById('filter-select');
            if (filterSelect) {
                filterSelect.value = activeFilter;
            }
        }
        
        // Refresh gallery to update dates
        const activeFilter = document.querySelector('.filter-buttons .btn.active').getAttribute('data-filter');
        let sortedImages = [...images];
        
        if (activeFilter === 'recent') {
            sortedImages.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
            sortedImages.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        
        populateGallery(sortedImages);
    }

    function updateTextElements(lang) {
        const translations = {
            en: {
                home: 'Home',
                collection: 'Collection',
                about: 'About',
                contact: 'Contact',
                searchPlaceholder: 'Search for images...',
                imageGallery: 'Image Gallery',
                mostRecent: 'Most Recent',
                oldestFirst: 'Oldest First',
                footer: 'Premium news images for media professionals',
                quickLinks: 'Quick Links',
                connectWithUs: 'Connect With Us',
                // Hero section
                heroTitle: 'Safari Press Photos',
                heroSubtitle: 'Discover premium news images for your projects',
                // Carousel captions
                carouselTitle1: 'Breaking News Coverage',
                carouselDesc1: 'Exclusive photojournalism from the frontlines',
                carouselTitle2: 'Cultural Events',
                carouselDesc2: 'Capturing moments that matter',
                carouselTitle3: 'Political Coverage',
                carouselDesc3: 'In-depth visual stories'
            },
            de: {
                home: 'Startseite',
                collection: 'Kollektion',
                about: 'Über Uns',
                contact: 'Kontakt',
                searchPlaceholder: 'Nach Bildern suchen...',
                imageGallery: 'Bildergalerie',
                mostRecent: 'Neueste zuerst',
                oldestFirst: 'Älteste zuerst',
                footer: 'Premium-Nachrichtenbilder für Medienprofis',
                quickLinks: 'Schnelllinks',
                connectWithUs: 'Verbinde dich mit uns',
                // Hero section
                heroTitle: 'Safari Press Photos',
                heroSubtitle: 'Entdecken Sie Premium-Nachrichtenbilder für Ihre Projekte',
                // Carousel captions
                carouselTitle1: 'Berichterstattung über aktuelle Ereignisse',
                carouselDesc1: 'Exklusiver Fotojournalismus von der Front',
                carouselTitle2: 'Kulturelle Veranstaltungen',
                carouselDesc2: 'Momente festhalten, die zählen',
                carouselTitle3: 'Politische Berichterstattung',
                carouselDesc3: 'Tiefgründige visuelle Geschichten'
            }
        };
        
        // Helper function to safely update text content
        function safelyUpdateText(selector, text) {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = text;
            }
        }

        function safelyUpdateById(id, text) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = text;
            }
        }
        
        // Helper to update input placeholder
        function updatePlaceholder(id, text) {
            const element = document.getElementById(id);
            if (element) {
                element.placeholder = text;
            }
        }
        
        // Helper to update select options
        function updateSelectOption(selectId, value, text) {
            const select = document.getElementById(selectId);
            if (select) {
                const option = select.querySelector(`option[value="${value}"]`);
                if (option) {
                    option.textContent = text;
                }
            }
        }
        
        // Update navbar
        safelyUpdateText('.nav-link[href="index.html"]', translations[lang].home);
        safelyUpdateText('.nav-link[href="collection.html"]', translations[lang].collection);
        safelyUpdateText('.nav-link[href="about.html"]', translations[lang].about);
        safelyUpdateText('.nav-link[href="contact.html"]', translations[lang].contact);
        
        // Update home page elements - these may vary by page
        // Only update elements that exist on the current page
        safelyUpdateById('hero-title', translations[lang].heroTitle);
        safelyUpdateById('hero-subtitle', translations[lang].heroSubtitle);
        updatePlaceholder('search-input', translations[lang].searchPlaceholder);
        safelyUpdateById('gallery-title', translations[lang].imageGallery);
        safelyUpdateById('recent-filter', translations[lang].mostRecent);
        safelyUpdateById('oldest-filter', translations[lang].oldestFirst);
        
        // Update dropdown options for mobile
        updateSelectOption('filter-select', 'recent', translations[lang].mostRecent);
        updateSelectOption('filter-select', 'older', translations[lang].oldestFirst);
        
        // Update carousel captions
        safelyUpdateById('carousel-title-1', translations[lang].carouselTitle1);
        safelyUpdateById('carousel-desc-1', translations[lang].carouselDesc1);
        safelyUpdateById('carousel-title-2', translations[lang].carouselTitle2);
        safelyUpdateById('carousel-desc-2', translations[lang].carouselDesc2);
        safelyUpdateById('carousel-title-3', translations[lang].carouselTitle3);
        safelyUpdateById('carousel-desc-3', translations[lang].carouselDesc3);
        
        // Update footer (common across all pages)
        safelyUpdateText('footer p:first-of-type', translations[lang].footer);
        safelyUpdateText('footer h5:nth-of-type(2)', translations[lang].quickLinks);
        safelyUpdateText('footer h5:nth-of-type(3)', translations[lang].connectWithUs);
        
        // Update footer links (common across all pages)
        safelyUpdateText('footer a[href="index.html"]', translations[lang].home);
        safelyUpdateText('footer a[href="collection.html"]', translations[lang].collection);
        safelyUpdateText('footer a[href="about.html"]', translations[lang].about);
        safelyUpdateText('footer a[href="contact.html"]', translations[lang].contact);
    }

    // Initialize with most recent images first
    document.querySelector('[data-filter="recent"]').click();
}); 