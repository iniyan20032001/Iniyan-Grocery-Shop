// Admin Dashboard Logic

// Get all products
function getAllProducts() {
    return JSON.parse(localStorage.getItem('grocery_products') || '[]');
}

// Get all orders
function getAllOrders() {
    return JSON.parse(localStorage.getItem('grocery_orders') || '[]')
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Get all users
function getAllUsers() {
    return JSON.parse(localStorage.getItem('grocery_users') || '[]');
}

// Display products in admin
function displayAdminProducts() {
    const products = getAllProducts();
    const productsList = document.getElementById('admin-products-list');
    
    if (!productsList) return;
    
    if (products.length === 0) {
        productsList.innerHTML = '<p>No products found.</p>';
        return;
    }
    
    productsList.innerHTML = products.map(product => `
        <div class="admin-product-card">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
            <h4>${product.name}</h4>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> ₹${product.price} / ${product.unit || '1 unit'}</p>
            <p><strong>Stock:</strong> ${product.stock} units</p>
            <div class="product-actions">
                <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Add product
function addProduct(name, category, price, image, stock, unit) {
    const products = getAllProducts();
    const newProduct = {
        id: Date.now(),
        name,
        category,
        price: parseFloat(price),
        image,
        stock: parseInt(stock),
        unit: unit || '1 unit'
    };
    
    products.push(newProduct);
    localStorage.setItem('grocery_products', JSON.stringify(products));
    displayAdminProducts();
}

// Edit product
function editProduct(productId) {
    const products = getAllProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Fill edit form
    document.getElementById('edit-product-id').value = product.id;
    document.getElementById('edit-product-name').value = product.name;
    document.getElementById('edit-product-category').value = product.category;
    document.getElementById('edit-product-price').value = product.price;
    document.getElementById('edit-product-image').value = product.image;
    document.getElementById('edit-product-stock').value = product.stock;
    document.getElementById('edit-product-unit').value = product.unit || '1 unit';
    
    // Show modal
    const modal = document.getElementById('edit-product-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Update product
function updateProduct(id, name, category, price, image, stock, unit) {
    const products = getAllProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    
    if (index !== -1) {
        products[index] = {
            ...products[index],
            name,
            category,
            price: parseFloat(price),
            image,
            stock: parseInt(stock),
            unit: unit || '1 unit'
        };
        localStorage.setItem('grocery_products', JSON.stringify(products));
        displayAdminProducts();
        closeEditModal();
    }
}

// Delete product
function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const products = getAllProducts();
    const updatedProducts = products.filter(p => p.id !== productId);
    localStorage.setItem('grocery_products', JSON.stringify(updatedProducts));
    displayAdminProducts();
}

// Close edit modal
function closeEditModal() {
    const modal = document.getElementById('edit-product-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Display sales report
function displaySalesReport(type, dateValue) {
    const orders = getAllOrders();
    const reportSummary = document.getElementById('report-summary');
    
    if (!reportSummary) return;
    
    // Filter orders based on report type
    let filteredOrders = orders;
    if (type === 'daily' && dateValue) {
        filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.date);
            const orderDateStr = orderDate.toISOString().split('T')[0];
            return orderDateStr === dateValue;
        });
    } else if (type === 'monthly' && dateValue) {
        filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.date);
            const orderMonth = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
            return orderMonth === dateValue;
        });
    }
    
    const totalSales = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = filteredOrders.length;
    
    // Calculate top selling products
    const productSales = {};
    filteredOrders.forEach(order => {
        order.items.forEach(item => {
            if (!productSales[item.name]) {
                productSales[item.name] = { quantity: 0, revenue: 0 };
            }
            productSales[item.name].quantity += item.quantity;
            productSales[item.name].revenue += item.price * item.quantity;
        });
    });
    
    const topProducts = Object.entries(productSales)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10);
    
    reportSummary.innerHTML = `
        <div class="report-stats">
            <div class="stat-card">
                <h4>Total Sales</h4>
                <div class="stat-value">₹${totalSales.toFixed(2)}</div>
            </div>
            <div class="stat-card">
                <h4>Total Orders</h4>
                <div class="stat-value">${orderCount}</div>
            </div>
            <div class="stat-card">
                <h4>Average Order Value</h4>
                <div class="stat-value">₹${orderCount > 0 ? (totalSales / orderCount).toFixed(2) : '0.00'}</div>
            </div>
        </div>
        <h3 style="margin-top: 2rem;">Top Selling Products</h3>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity Sold</th>
                    <th>Revenue</th>
                </tr>
            </thead>
            <tbody>
                ${topProducts.length > 0 ? topProducts.map(product => `
                    <tr>
                        <td>${product.name}</td>
                        <td>${product.quantity}</td>
                        <td>₹${product.revenue.toFixed(2)}</td>
                    </tr>
                `).join('') : '<tr><td colspan="3">No sales data available</td></tr>'}
            </tbody>
        </table>
    `;
}

// Display admin orders
function displayAdminOrders() {
    const orders = getAllOrders();
    const ordersList = document.getElementById('admin-orders-list');
    
    if (!ordersList) return;
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders found.</p>';
        return;
    }
    
    // Get users for display
    const users = getAllUsers();
    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : 'Unknown User';
    };
    
    ordersList.innerHTML = orders.map(order => `
        <div class="admin-order-card">
            <div class="admin-order-header">
                <div>
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-date">${new Date(order.date).toLocaleString()}</div>
                    <div style="margin-top: 0.5rem;"><strong>Customer:</strong> ${getUserName(order.userId)}</div>
                </div>
                <div>
                    <select class="status-select" id="status-${order.id}">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="packed" ${order.status === 'packed' ? 'selected' : ''}>Packed</option>
                        <option value="out-for-delivery" ${order.status === 'out-for-delivery' ? 'selected' : ''}>Out for Delivery</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                    <button class="btn-update-status" onclick="updateOrderStatus(${order.id})">Update</button>
                </div>
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
                        <strong>Address:</strong> ${order.address.addressLine1}, ${order.address.landmark}, ${order.address.pincode}
                    </div>
                    <div><strong>Contact:</strong> ${order.address.name} - ${order.address.mobile}</div>
                ` : ''}
                ${order.deliveryNotes ? `<div style="margin-top: 0.5rem;"><strong>Delivery Notes:</strong> ${order.deliveryNotes}</div>` : ''}
            </div>
        </div>
    `).join('');
}

// Update order status
function updateOrderStatus(orderId) {
    const orders = getAllOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    const statusSelect = document.getElementById(`status-${orderId}`);
    const newStatus = statusSelect.value;
    
    order.status = newStatus;
    localStorage.setItem('grocery_orders', JSON.stringify(orders));
    
    displayAdminOrders();
    alert('Order status updated successfully!');
}

// Setup admin tabs
function setupAdminTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show/hide tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(targetTab).classList.add('active');
            
            // Load data for active tab
            if (targetTab === 'manage-menu') {
                displayAdminProducts();
            } else if (targetTab === 'sales-report') {
                const reportType = document.getElementById('report-type');
                const reportDate = document.getElementById('report-date');
                const reportMonth = document.getElementById('report-month');
                if (reportType && reportType.value === 'daily' && reportDate) {
                    displaySalesReport('daily', reportDate.value);
                } else if (reportType && reportType.value === 'monthly' && reportMonth) {
                    displaySalesReport('monthly', reportMonth.value);
                }
            } else if (targetTab === 'order-management') {
                displayAdminOrders();
            }
        });
    });
}

// Initialize admin page
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('grocery_currentUser') || 'null');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Setup add product form
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('product-name').value;
            const category = document.getElementById('product-category').value;
            const price = document.getElementById('product-price').value;
            const image = document.getElementById('product-image').value;
            const stock = document.getElementById('product-stock').value;
            const unit = document.getElementById('product-unit').value;
            
            addProduct(name, category, price, image, stock, unit);
            addProductForm.reset();
            alert('Product added successfully!');
        });
    }
    
    // Setup edit product form
    const editProductForm = document.getElementById('edit-product-form');
    if (editProductForm) {
        editProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('edit-product-id').value;
            const name = document.getElementById('edit-product-name').value;
            const category = document.getElementById('edit-product-category').value;
            const price = document.getElementById('edit-product-price').value;
            const image = document.getElementById('edit-product-image').value;
            const stock = document.getElementById('edit-product-stock').value;
            const unit = document.getElementById('edit-product-unit').value;
            
            updateProduct(id, name, category, price, image, stock, unit);
            alert('Product updated successfully!');
        });
    }
    
    // Setup report filters
    const reportType = document.getElementById('report-type');
    const reportDate = document.getElementById('report-date');
    const reportMonth = document.getElementById('report-month');
    const reportDateLabel = document.getElementById('report-date-label');
    
    const updateReportDisplay = () => {
        const type = reportType.value;
        if (type === 'daily') {
            reportDate.style.display = 'block';
            reportMonth.style.display = 'none';
            reportDateLabel.textContent = 'Select Date:';
            const today = new Date().toISOString().split('T')[0];
            reportDate.value = today;
            displaySalesReport('daily', reportDate.value);
        } else {
            reportDate.style.display = 'none';
            reportMonth.style.display = 'block';
            reportDateLabel.textContent = 'Select Month:';
            const today = new Date();
            reportMonth.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
            displaySalesReport('monthly', reportMonth.value);
        }
    };
    
    if (reportType) {
        reportType.addEventListener('change', updateReportDisplay);
    }
    
    if (reportDate) {
        reportDate.addEventListener('change', () => {
            displaySalesReport('daily', reportDate.value);
        });
    }
    
    if (reportMonth) {
        reportMonth.addEventListener('change', () => {
            displaySalesReport('monthly', reportMonth.value);
        });
    }
    
    // Initialize report display
    if (reportType && reportDate && reportMonth) {
        updateReportDisplay();
    }
    
    // Setup close modal
    const closeModal = document.querySelector('#edit-product-modal .close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', closeEditModal);
    }
    
    // Close modal on outside click
    const editModal = document.getElementById('edit-product-modal');
    if (editModal) {
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                closeEditModal();
            }
        });
    }
    
    setupAdminTabs();
    displayAdminProducts();
});

