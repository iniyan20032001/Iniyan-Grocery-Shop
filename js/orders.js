// Order Tracking Logic

// Get user's orders
function getUserOrders() {
    const currentUser = JSON.parse(localStorage.getItem('grocery_currentUser') || 'null');
    if (!currentUser) return [];
    
    const orders = JSON.parse(localStorage.getItem('grocery_orders') || '[]');
    return orders.filter(order => order.userId === currentUser.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Get status badge class
function getStatusClass(status) {
    const statusMap = {
        'pending': 'status-pending',
        'packed': 'status-packed',
        'out-for-delivery': 'status-out-for-delivery',
        'delivered': 'status-delivered'
    };
    return statusMap[status] || 'status-pending';
}

// Get status display name
function getStatusName(status) {
    const statusMap = {
        'pending': 'Pending',
        'packed': 'Packed',
        'out-for-delivery': 'Out for Delivery',
        'delivered': 'Delivered'
    };
    return statusMap[status] || status;
}

// Display orders
function displayOrders() {
    const orders = getUserOrders();
    const ordersContainer = document.getElementById('orders-container');
    
    if (!ordersContainer) return;
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = '<p class="empty-orders">No orders yet. <a href="index.html">Start shopping!</a></p>';
        return;
    }
    
    ordersContainer.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-date">${new Date(order.date).toLocaleString()}</div>
                </div>
                <span class="status-badge ${getStatusClass(order.status)}">
                    ${getStatusName(order.status)}
                </span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                Total: ₹${order.total.toFixed(2)}
            </div>
            <div class="delivery-info">
                <strong>Delivery Slot:</strong> ${order.deliverySlot}
                ${order.address ? `
                    <div style="margin-top: 0.5rem;">
                        <strong>Delivery Address:</strong><br>
                        ${order.address.name}<br>
                        ${order.address.addressLine1}, ${order.address.landmark}<br>
                        Pincode: ${order.address.pincode}<br>
                        Mobile: ${order.address.mobile}
                    </div>
                ` : ''}
                ${order.deliveryNotes ? `<div style="margin-top: 0.5rem;"><strong>Delivery Instructions:</strong> ${order.deliveryNotes}</div>` : ''}
            </div>
        </div>
    `).join('');
}

// Initialize orders page
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('grocery_currentUser') || 'null');
    if (!currentUser) {
        alert('Please login to view orders');
        window.location.href = 'login.html';
        return;
    }
    
    displayOrders();
});

