// Cart and Billing Logic

// Get current user's cart
function getCart() {
    const currentUser = JSON.parse(localStorage.getItem('grocery_currentUser') || 'null');
    if (!currentUser) return [];
    
    const cartKey = `grocery_cart_${currentUser.id}`;
    return JSON.parse(localStorage.getItem(cartKey) || '[]');
}

// Update cart
function updateCart(cart) {
    const currentUser = JSON.parse(localStorage.getItem('grocery_currentUser') || 'null');
    if (!currentUser) return;
    
    const cartKey = `grocery_cart_${currentUser.id}`;
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

// Display cart items
function displayCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="index.html">Start shopping!</a></p>';
        updateSummary(0);
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => {
        const unit = item.unit || '1 unit';
        return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} / ${unit}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           min="1" onchange="setQuantity(${item.id}, this.value)">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div>
                <div class="cart-item-price" style="margin-bottom: 10px;">₹${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `;
    }).join('');
    
    calculateSummary();
}

// Update quantity
function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        const newQuantity = Math.max(1, item.quantity + change);
        // Check stock availability
        const products = JSON.parse(localStorage.getItem('grocery_products') || '[]');
        const product = products.find(p => p.id === productId);
        
        if (product && newQuantity > product.stock) {
            alert(`Only ${product.stock} units available in stock!`);
            return;
        }
        
        item.quantity = newQuantity;
        updateCart(cart);
        displayCart();
        if (typeof updateCartCount === 'function') updateCartCount();
    }
}

// Set quantity
function setQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        const newQuantity = Math.max(1, parseInt(quantity) || 1);
        // Check stock availability
        const products = JSON.parse(localStorage.getItem('grocery_products') || '[]');
        const product = products.find(p => p.id === productId);
        
        if (product && newQuantity > product.stock) {
            alert(`Only ${product.stock} units available in stock!`);
            item.quantity = product.stock;
        } else {
            item.quantity = newQuantity;
        }
        
        updateCart(cart);
        displayCart();
        if (typeof updateCartCount === 'function') updateCartCount();
    }
}

// Remove from cart - restore stock
function removeFromCart(productId) {
    if (!confirm('Remove this item from cart?')) return;
    
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        // Restore stock
        const products = JSON.parse(localStorage.getItem('grocery_products') || '[]');
        const product = products.find(p => p.id === productId);
        if (product) {
            product.stock += item.quantity;
            const productIndex = products.findIndex(p => p.id === productId);
            products[productIndex] = product;
            localStorage.setItem('grocery_products', JSON.stringify(products));
        }
    }
    
    const updatedCart = cart.filter(i => i.id !== productId);
    updateCart(updatedCart);
    displayCart();
    if (typeof updateCartCount === 'function') updateCartCount();
}

// Calculate summary
function calculateSummary() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    updateSummary(total);
}

// Update summary display
function updateSummary(total) {
    const totalEl = document.getElementById('total');
    
    if (totalEl) totalEl.textContent = `₹${total.toFixed(2)}`;
}

// Clear cart - restore all stock
function clearCart() {
    if (!confirm('Clear all items from cart?')) return;
    
    const currentUser = JSON.parse(localStorage.getItem('grocery_currentUser') || 'null');
    if (!currentUser) return;
    
    const cart = getCart();
    // Restore stock for all items
    const products = JSON.parse(localStorage.getItem('grocery_products') || '[]');
    cart.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (product) {
            product.stock += cartItem.quantity;
        }
    });
    localStorage.setItem('grocery_products', JSON.stringify(products));
    
    const cartKey = `grocery_cart_${currentUser.id}`;
    localStorage.removeItem(cartKey);
    displayCart();
    if (typeof updateCartCount === 'function') updateCartCount();
}

// Setup delivery date min value
function setupDeliveryDate() {
    const deliveryDate = document.getElementById('delivery-date');
    if (deliveryDate) {
        const today = new Date();
        today.setDate(today.getDate() + 1); // Minimum next day
        const tomorrow = today.toISOString().split('T')[0];
        deliveryDate.min = tomorrow;
        deliveryDate.value = tomorrow;
    }
}

// Use geolocation to fill address
function useMyLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }
    
    const btn = document.getElementById('use-location-btn');
    if (btn) {
        btn.textContent = '📍 Getting location...';
        btn.disabled = true;
    }
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            try {
                // Use reverse geocoding API (using a free service)
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                const data = await response.json();
                
                if (data && data.address) {
                    const addr = data.address;
                    const addressLine1 = document.getElementById('address-line1');
                    const landmark = document.getElementById('landmark');
                    const pincode = document.getElementById('pincode');
                    
                    if (addressLine1) {
                        addressLine1.value = `${addr.house_number || ''} ${addr.road || ''}`.trim() || addr.building || '';
                    }
                    if (landmark) {
                        landmark.value = addr.suburb || addr.neighbourhood || addr.village || '';
                    }
                    if (pincode) {
                        pincode.value = addr.postcode || '';
                    }
                    
                    alert('Address filled successfully!');
                } else {
                    alert('Could not retrieve address. Please enter manually.');
                }
            } catch (error) {
                console.error('Geocoding error:', error);
                alert('Could not retrieve address. Please enter manually.');
            } finally {
                if (btn) {
                    btn.textContent = '📍 Use My Location';
                    btn.disabled = false;
                }
            }
        },
        (error) => {
            alert('Unable to retrieve your location. Please enter address manually.');
            if (btn) {
                btn.textContent = '📍 Use My Location';
                btn.disabled = false;
            }
        }
    );
}

// Validate address fields
function validateAddress() {
    const name = document.getElementById('customer-name')?.value.trim();
    const mobile = document.getElementById('customer-mobile')?.value.trim();
    const addressLine1 = document.getElementById('address-line1')?.value.trim();
    const landmark = document.getElementById('landmark')?.value.trim();
    const pincode = document.getElementById('pincode')?.value.trim();
    
    if (!name || !mobile || !addressLine1 || !landmark || !pincode) {
        alert('Please fill all address fields');
        return false;
    }
    
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        return false;
    }
    
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
        alert('Please enter a valid 6-digit pincode');
        return false;
    }
    
    return true;
}

// Initialize Razorpay payment
function initiateRazorpayPayment() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Validate address
    if (!validateAddress()) {
        return;
    }
    
    const deliveryDate = document.getElementById('delivery-date').value;
    const deliveryTime = document.getElementById('delivery-time').value;
    
    if (!deliveryDate || !deliveryTime) {
        alert('Please select delivery date and time');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Razorpay options
    const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag', // Replace with your Razorpay key or use test key
        amount: Math.round(total * 100), // Amount in paise
        currency: 'INR',
        name: 'Iniyan Grocery Shop',
        description: 'Grocery Order Payment',
        handler: function(response) {
            // Payment successful
            handlePaymentSuccess(response, total);
        },
        prefill: {
            name: document.getElementById('customer-name').value,
            contact: document.getElementById('customer-mobile').value,
            email: JSON.parse(localStorage.getItem('grocery_currentUser') || '{}').email || ''
        },
        theme: {
            color: '#4CAF50'
        },
        modal: {
            ondismiss: function() {
                console.log('Payment cancelled');
            }
        }
    };
    
    // For demo/testing, you can use a test payment link
    // Uncomment the line below and comment the Razorpay checkout if you want to use test link
    // window.open('https://rzp.io/l/demoLink', '_blank');
    // handlePaymentSuccess({razorpay_payment_id: 'test_' + Date.now()}, total);
    // return;
    
    const rzp = new Razorpay(options);
    rzp.open();
}

// Handle payment success
function handlePaymentSuccess(response, total) {
    const cart = getCart();
    const currentUser = JSON.parse(localStorage.getItem('grocery_currentUser') || 'null');
    
    if (!currentUser) {
        alert('Please login to place order');
        window.location.href = 'login.html';
        return;
    }
    
    const deliveryDate = document.getElementById('delivery-date').value;
    const deliveryTime = document.getElementById('delivery-time').value;
    const deliveryNotes = document.getElementById('delivery-notes')?.value || '';
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Get address details
    const address = {
        name: document.getElementById('customer-name').value,
        mobile: document.getElementById('customer-mobile').value,
        addressLine1: document.getElementById('address-line1').value,
        landmark: document.getElementById('landmark').value,
        pincode: document.getElementById('pincode').value
    };
    
    // Create order
    const orders = JSON.parse(localStorage.getItem('grocery_orders') || '[]');
    const orderId = Date.now();
    const order = {
        id: orderId,
        userId: currentUser.id,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            unit: item.unit || '1 unit'
        })),
        total,
        status: 'pending',
        deliverySlot: `${deliveryDate} ${deliveryTime}`,
        deliveryNotes,
        address,
        paymentId: response.razorpay_payment_id,
        date: new Date().toISOString()
    };
    
    orders.push(order);
    localStorage.setItem('grocery_orders', JSON.stringify(orders));
    
    // Clear cart
    const cartKey = `grocery_cart_${currentUser.id}`;
    localStorage.removeItem(cartKey);
    
    // Show success modal
    showPaymentSuccessModal(orderId);
    
    // Update cart count
    if (typeof updateCartCount === 'function') updateCartCount();
}

// Show payment success modal
function showPaymentSuccessModal(orderId) {
    const modal = document.getElementById('payment-success-modal');
    const orderIdEl = document.getElementById('success-order-id');
    
    if (orderIdEl) {
        orderIdEl.textContent = `#${orderId}`;
    }
    
    if (modal) {
        modal.classList.add('active');
    }
}

// Close payment success modal
function closePaymentSuccessModal() {
    const modal = document.getElementById('payment-success-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Print bill
function printBill() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Bill - Iniyan Grocery Shop</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { text-align: center; color: #4CAF50; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                    th { background-color: #4CAF50; color: white; }
                    .total { font-weight: bold; font-size: 1.2em; }
                    .right { text-align: right; }
                </style>
            </head>
            <body>
                <h1>🛒 Iniyan Grocery Shop</h1>
                <h2>Bill</h2>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th class="right">Price</th>
                            <th class="right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cart.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity} ${item.unit || ''}</td>
                                <td class="right">₹${item.price}</td>
                                <td class="right">₹${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr class="total">
                            <td colspan="3" class="right">Total:</td>
                            <td class="right">₹${total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
                <p style="text-align: center; margin-top: 30px;">Thank you for shopping with us!</p>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('grocery_currentUser') || 'null');
    if (!currentUser) {
        alert('Please login to view cart');
        window.location.href = 'login.html';
        return;
    }
    
    // Pre-fill customer name and mobile from user data
    const customerName = document.getElementById('customer-name');
    const customerMobile = document.getElementById('customer-mobile');
    if (customerName && currentUser.name) {
        customerName.value = currentUser.name;
    }
    if (customerMobile && currentUser.mobile) {
        customerMobile.value = currentUser.mobile;
    }
    
    setupDeliveryDate();
    displayCart();
    
    // Setup buttons
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const payNowBtn = document.getElementById('pay-now-btn');
    const printBillBtn = document.getElementById('print-bill-btn');
    const useLocationBtn = document.getElementById('use-location-btn');
    const viewOrdersBtn = document.getElementById('view-orders-btn');
    const closeModal = document.querySelector('#payment-success-modal .close-modal');
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    if (payNowBtn) {
        payNowBtn.addEventListener('click', initiateRazorpayPayment);
    }
    
    if (printBillBtn) {
        printBillBtn.addEventListener('click', printBill);
    }
    
    if (useLocationBtn) {
        useLocationBtn.addEventListener('click', useMyLocation);
    }
    
    if (viewOrdersBtn) {
        viewOrdersBtn.addEventListener('click', () => {
            closePaymentSuccessModal();
            window.location.href = 'orders.html';
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closePaymentSuccessModal);
    }
    
    // Close modal on outside click
    const modal = document.getElementById('payment-success-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePaymentSuccessModal();
            }
        });
    }
});
