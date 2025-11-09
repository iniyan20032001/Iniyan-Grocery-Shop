// Main Application Logic

// Initialize data on first load
function initializeData() {
    if (!localStorage.getItem('grocery_products')) {
        const products = [
            // Rice & Grains
            { id: 1, name: 'Ponni Raw Rice', category: 'Rice & Grains', price: 120, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', stock: 50, unit: '1 kg' },
            { id: 2, name: 'Idly Rice', category: 'Rice & Grains', price: 110, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', stock: 45, unit: '1 kg' },
            { id: 3, name: 'Basmati Rice', category: 'Rice & Grains', price: 180, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', stock: 40, unit: '1 kg' },
            { id: 4, name: 'Toor Dal', category: 'Rice & Grains', price: 150, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400', stock: 60, unit: '1 kg' },
            { id: 5, name: 'Urad Dal', category: 'Rice & Grains', price: 160, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400', stock: 55, unit: '1 kg' },
            { id: 6, name: 'Moong Dal', category: 'Rice & Grains', price: 140, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400', stock: 50, unit: '1 kg' },
            { id: 7, name: 'Wheat Flour', category: 'Rice & Grains', price: 50, image: 'https://images.unsplash.com/photo-1615485925511-870d8e0bbe61?w=400', stock: 70, unit: '1 kg' },
            { id: 8, name: 'Rava / Sooji', category: 'Rice & Grains', price: 60, image: 'https://images.unsplash.com/photo-1615485925511-870d8e0bbe61?w=400', stock: 65, unit: '500 g' },
            
            // Spices & Masala
            { id: 9, name: 'Turmeric Powder', category: 'Spices & Masala', price: 80, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', stock: 80, unit: '200 g' },
            { id: 10, name: 'Chilli Powder', category: 'Spices & Masala', price: 90, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', stock: 75, unit: '200 g' },
            { id: 11, name: 'Coriander Powder', category: 'Spices & Masala', price: 85, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', stock: 70, unit: '200 g' },
            { id: 12, name: 'Cumin Seeds', category: 'Spices & Masala', price: 100, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', stock: 60, unit: '100 g' },
            { id: 13, name: 'Mustard Seeds', category: 'Spices & Masala', price: 95, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', stock: 65, unit: '100 g' },
            { id: 14, name: 'Garam Masala', category: 'Spices & Masala', price: 110, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', stock: 55, unit: '100 g' },
            { id: 15, name: 'Pepper', category: 'Spices & Masala', price: 200, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', stock: 50, unit: '100 g' },
            { id: 16, name: 'Asafoetida (Hing)', category: 'Spices & Masala', price: 150, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', stock: 45, unit: '50 g' },
            
            // Cooking Oils
            { id: 17, name: 'Sunflower Oil', category: 'Cooking Oils', price: 180, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', stock: 40, unit: '1 liter' },
            { id: 18, name: 'Groundnut Oil', category: 'Cooking Oils', price: 200, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', stock: 35, unit: '1 liter' },
            { id: 19, name: 'Gingelly Oil (Sesame Oil)', category: 'Cooking Oils', price: 250, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', stock: 30, unit: '500 ml' },
            { id: 20, name: 'Coconut Oil', category: 'Cooking Oils', price: 220, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', stock: 38, unit: '1 liter' },
            
            // Snacks & Biscuits
            { id: 21, name: 'Parle-G', category: 'Snacks & Biscuits', price: 30, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', stock: 100, unit: '1 pack' },
            { id: 22, name: 'Marie Gold', category: 'Snacks & Biscuits', price: 35, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', stock: 90, unit: '1 pack' },
            { id: 23, name: 'Good Day', category: 'Snacks & Biscuits', price: 40, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', stock: 85, unit: '1 pack' },
            { id: 24, name: 'Potato Chips', category: 'Snacks & Biscuits', price: 50, image: 'https://images.unsplash.com/photo-1616190171444-0e4c0a0c0a0a?w=400', stock: 80, unit: '1 pack' },
            { id: 25, name: 'Murukku / Mixture', category: 'Snacks & Biscuits', price: 120, image: 'https://images.unsplash.com/photo-1616190171444-0e4c0a0c0a0a?w=400', stock: 60, unit: '500 g' },
            
            // Beverages
            { id: 26, name: 'Tea Powder (Tata)', category: 'Beverages', price: 150, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', stock: 70, unit: '500 g' },
            { id: 27, name: 'Tea Powder (Red Label)', category: 'Beverages', price: 180, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', stock: 65, unit: '500 g' },
            { id: 28, name: 'Coffee Powder (Bru)', category: 'Beverages', price: 200, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', stock: 60, unit: '200 g' },
            { id: 29, name: 'Coffee Powder (Nescafe)', category: 'Beverages', price: 250, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', stock: 55, unit: '200 g' },
            { id: 30, name: 'Boost', category: 'Beverages', price: 300, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400', stock: 50, unit: '500 g' },
            { id: 31, name: 'Horlicks', category: 'Beverages', price: 320, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400', stock: 48, unit: '500 g' },
            { id: 32, name: 'Bournvita', category: 'Beverages', price: 280, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400', stock: 52, unit: '500 g' },
            { id: 33, name: 'Coca-Cola', category: 'Beverages', price: 40, image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400', stock: 120, unit: '750 ml' },
            { id: 34, name: 'Sprite', category: 'Beverages', price: 40, image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400', stock: 115, unit: '750 ml' },
            
            // Personal Care
            { id: 35, name: 'Soap (Lifebuoy)', category: 'Personal Care', price: 45, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400', stock: 90, unit: '1 piece' },
            { id: 36, name: 'Soap (Lux)', category: 'Personal Care', price: 50, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400', stock: 85, unit: '1 piece' },
            { id: 37, name: 'Soap (Dove)', category: 'Personal Care', price: 80, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400', stock: 70, unit: '1 piece' },
            { id: 38, name: 'Shampoo (Clinic Plus)', category: 'Personal Care', price: 120, image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400', stock: 65, unit: '200 ml' },
            { id: 39, name: 'Shampoo (Sunsilk)', category: 'Personal Care', price: 130, image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400', stock: 60, unit: '200 ml' },
            { id: 40, name: 'Toothpaste (Colgate)', category: 'Personal Care', price: 90, image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400', stock: 75, unit: '200 g' },
            { id: 41, name: 'Toothpaste (Pepsodent)', category: 'Personal Care', price: 85, image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400', stock: 70, unit: '200 g' },
            { id: 42, name: 'Hair Oil (Coconut)', category: 'Personal Care', price: 100, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400', stock: 68, unit: '200 ml' },
            { id: 43, name: 'Hair Oil (Almond)', category: 'Personal Care', price: 150, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400', stock: 55, unit: '200 ml' },
            
            // Home Cleaning
            { id: 44, name: 'Surf Excel', category: 'Home Cleaning', price: 200, image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400', stock: 50, unit: '1 kg' },
            { id: 45, name: 'Ariel', category: 'Home Cleaning', price: 220, image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400', stock: 45, unit: '1 kg' },
            { id: 46, name: 'Vim Bar', category: 'Home Cleaning', price: 30, image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400', stock: 100, unit: '1 piece' },
            { id: 47, name: 'Vim Liquid', category: 'Home Cleaning', price: 80, image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400', stock: 70, unit: '500 ml' },
            { id: 48, name: 'Phenyl', category: 'Home Cleaning', price: 60, image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400', stock: 80, unit: '500 ml' },
            { id: 49, name: 'Harpic', category: 'Home Cleaning', price: 90, image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400', stock: 65, unit: '500 ml' },
            { id: 50, name: 'Dish Sponge / Scrubber', category: 'Home Cleaning', price: 25, image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400', stock: 120, unit: '1 piece' },
            
            // Vegetables & Fruits
            { id: 51, name: 'Tomato', category: 'Vegetables & Fruits', price: 40, image: 'https://images.unsplash.com/photo-1546470427-e26264be0b6a?w=400', stock: 200, unit: '1 kg' },
            { id: 52, name: 'Onion', category: 'Vegetables & Fruits', price: 35, image: 'https://images.unsplash.com/photo-1618512496249-3e7029d65cc8?w=400', stock: 180, unit: '1 kg' },
            { id: 53, name: 'Potato', category: 'Vegetables & Fruits', price: 30, image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400', stock: 190, unit: '1 kg' },
            { id: 54, name: 'Banana', category: 'Vegetables & Fruits', price: 50, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400', stock: 150, unit: '1 dozen' },
            { id: 55, name: 'Apple', category: 'Vegetables & Fruits', price: 150, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', stock: 100, unit: '1 kg' },
            { id: 56, name: 'Carrot', category: 'Vegetables & Fruits', price: 45, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400', stock: 160, unit: '1 kg' },
            
            // Dairy & Frozen
            { id: 57, name: 'Milk (Aavin)', category: 'Dairy & Frozen', price: 60, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', stock: 100, unit: '1 liter' },
            { id: 58, name: 'Milk (Hatsun)', category: 'Dairy & Frozen', price: 65, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', stock: 95, unit: '1 liter' },
            { id: 59, name: 'Curd', category: 'Dairy & Frozen', price: 50, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', stock: 80, unit: '500 g' },
            { id: 60, name: 'Butter', category: 'Dairy & Frozen', price: 120, image: 'https://images.unsplash.com/photo-1618164436269-44739342d7e3?w=400', stock: 60, unit: '200 g' },
            { id: 61, name: 'Paneer', category: 'Dairy & Frozen', price: 300, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', stock: 40, unit: '500 g' },
            
            // Miscellaneous
            { id: 62, name: 'Salt', category: 'Miscellaneous', price: 20, image: 'https://images.unsplash.com/photo-1607425191150-384a0e87b5b3?w=400', stock: 150, unit: '1 kg' },
            { id: 63, name: 'Sugar', category: 'Miscellaneous', price: 50, image: 'https://images.unsplash.com/photo-1607425191150-384a0e87b5b3?w=400', stock: 120, unit: '1 kg' },
            { id: 64, name: 'Jaggery', category: 'Miscellaneous', price: 80, image: 'https://images.unsplash.com/photo-1607425191150-384a0e87b5b3?w=400', stock: 90, unit: '500 g' },
            { id: 65, name: 'Pickles', category: 'Miscellaneous', price: 100, image: 'https://images.unsplash.com/photo-1607425191150-384a0e87b5b3?w=400', stock: 70, unit: '500 g' },
            { id: 66, name: 'Papad', category: 'Miscellaneous', price: 60, image: 'https://images.unsplash.com/photo-1607425191150-384a0e87b5b3?w=400', stock: 85, unit: '200 g' }
        ];
        localStorage.setItem('grocery_products', JSON.stringify(products));
    }

    if (!localStorage.getItem('grocery_users')) {
        localStorage.setItem('grocery_users', JSON.stringify([]));
    }

    if (!localStorage.getItem('grocery_orders')) {
        localStorage.setItem('grocery_orders', JSON.stringify([]));
    }

    if (!localStorage.getItem('grocery_adminPassword')) {
        localStorage.setItem('grocery_adminPassword', 'admin123');
    }
}

// Get all products
function getProducts() {
    return JSON.parse(localStorage.getItem('grocery_products') || '[]');
}

// Get products by category
function getProductsByCategory(category) {
    const products = getProducts();
    if (!category || category === 'All') return products;
    return products.filter(p => p.category === category);
}

// Search products
function searchProducts(query) {
    const products = getProducts();
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
}

// Get all categories
function getCategories() {
    const products = getProducts();
    const categories = ['All', ...new Set(products.map(p => p.category))];
    return categories;
}

// Display products
function displayProducts(products) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found.</p>';
        return;
    }

    const isOutOfStock = (product) => product.stock <= 0;

    grid.innerHTML = products.map(product => {
        const outOfStock = isOutOfStock(product);
        const unit = product.unit || '1 unit';
        
        return `
        <div class="product-card ${outOfStock ? 'out-of-stock' : ''}">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">₹${product.price} <span class="product-unit">/ ${unit}</span></div>
                ${outOfStock ? 
                    '<button class="btn-add-cart" disabled>Out of Stock</button>' :
                    `<button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>`
                }
            </div>
        </div>
    `;
    }).join('');
}

// Display categories
function displayCategories() {
    const filters = document.getElementById('category-filters');
    if (!filters) return;

    const categories = getCategories();
    filters.innerHTML = categories.map(category => `
        <button class="category-btn ${category === 'All' ? 'active' : ''}" 
                onclick="filterByCategory('${category}')">
            ${category}
        </button>
    `).join('');
}

// Filter by category
function filterByCategory(category) {
    const products = category === 'All' ? getProducts() : getProductsByCategory(category);
    displayProducts(products);
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update title
    const title = document.getElementById('category-title');
    if (title) {
        title.textContent = category === 'All' ? 'All Products' : category;
    }
}

// Add to cart
function addToCart(productId) {
    const currentUser = JSON.parse(localStorage.getItem('grocery_currentUser') || 'null');
    if (!currentUser) {
        alert('Please login to add items to cart');
        window.location.href = 'login.html';
        return;
    }

    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check stock availability
    if (product.stock <= 0) {
        alert('This product is out of stock!');
        displayProducts(products); // Refresh display
        return;
    }

    const cartKey = `grocery_cart_${currentUser.id}`;
    let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    
    const existingItem = cart.find(item => item.id === productId);
    const requestedQuantity = existingItem ? existingItem.quantity + 1 : 1;
    
    // Check if adding this item would exceed stock
    if (requestedQuantity > product.stock) {
        alert(`Only ${product.stock} units available in stock!`);
        return;
    }
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    // Reduce stock
    product.stock -= 1;
    const allProducts = getProducts();
    const productIndex = allProducts.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        allProducts[productIndex].stock = product.stock;
        localStorage.setItem('grocery_products', JSON.stringify(allProducts));
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartCount();
    
    // Refresh product display to show updated stock
    const currentCategory = document.querySelector('.category-btn.active')?.textContent || 'All';
    if (currentCategory === 'All') {
        displayProducts(getProducts());
    } else {
        displayProducts(getProductsByCategory(currentCategory));
    }
    
    // Show feedback
    showNotification(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const currentUser = JSON.parse(localStorage.getItem('grocery_currentUser') || 'null');
    const cartCounts = document.querySelectorAll('#cart-count');
    
    if (!currentUser) {
        cartCounts.forEach(el => el.textContent = '0');
        return;
    }

    const cartKey = `grocery_cart_${currentUser.id}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCounts.forEach(el => el.textContent = count);
}

// Show notification
function showNotification(message) {
    // Simple notification - can be enhanced
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    updateCartCount();
    
    // Setup search
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const query = searchInput.value.trim();
            const products = searchProducts(query);
            displayProducts(products);
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
    
    // Setup mobile menu
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
    
    // Display categories and products on index page
    if (document.getElementById('category-filters')) {
        displayCategories();
        displayProducts(getProducts());
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

