// Authentication Logic

// Check if user is logged in
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('grocery_currentUser') || 'null');
    return currentUser;
}

// Update UI based on auth status
function updateAuthUI() {
    const currentUser = checkAuth();
    const userMenu = document.getElementById('user-menu');
    const loginLink = document.getElementById('login-link');
    const userName = document.getElementById('user-name');
    const logoutBtn = document.getElementById('logout-btn');
    const adminLink = document.getElementById('admin-link');

    if (currentUser) {
        if (userMenu) userMenu.style.display = 'block';
        if (loginLink) loginLink.style.display = 'none';
        if (userName) userName.textContent = currentUser.name;
        
        // Show admin link if user has admin access (any logged in user can access admin with password)
        if (adminLink) {
            adminLink.style.display = 'block';
        }
    } else {
        if (userMenu) userMenu.style.display = 'none';
        if (loginLink) loginLink.style.display = 'block';
        if (adminLink) adminLink.style.display = 'none';
    }
}

// Login
function login(identifier, password) {
    const users = JSON.parse(localStorage.getItem('grocery_users') || '[]');
    const user = users.find(u => 
        (u.email === identifier || u.mobile === identifier) && 
        u.password === password
    );

    if (user) {
        localStorage.setItem('grocery_currentUser', JSON.stringify(user));
        return { success: true, user };
    }
    return { success: false, message: 'Invalid email/mobile or password' };
}

// Signup
function signup(name, email, mobile, password) {
    const users = JSON.parse(localStorage.getItem('grocery_users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email || u.mobile === mobile)) {
        return { success: false, message: 'User already exists with this email or mobile' };
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        mobile,
        password,
        isAdmin: false,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('grocery_users', JSON.stringify(users));
    localStorage.setItem('grocery_currentUser', JSON.stringify(newUser));

    return { success: true, user: newUser };
}

// Mock Google OAuth
function mockGoogleLogin() {
    const users = JSON.parse(localStorage.getItem('grocery_users') || '[]');
    
    // Check if Google user exists
    let googleUser = users.find(u => u.email === 'google.user@example.com');
    
    if (!googleUser) {
        // Create new Google user
        googleUser = {
            id: Date.now(),
            name: 'Google User',
            email: 'google.user@example.com',
            mobile: '9999999999',
            password: 'google_oauth',
            isAdmin: false,
            createdAt: new Date().toISOString()
        };
        users.push(googleUser);
        localStorage.setItem('grocery_users', JSON.stringify(users));
    }

    localStorage.setItem('grocery_currentUser', JSON.stringify(googleUser));
    return { success: true, user: googleUser };
}

// Logout
function logout() {
    localStorage.removeItem('grocery_currentUser');
    sessionStorage.removeItem('grocery_adminAccess');
    window.location.href = 'index.html';
}

// Setup auth forms
function setupAuthForms() {
    // Login form
    const loginForm = document.getElementById('login-form-element');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const identifier = document.getElementById('login-identifier').value;
            const password = document.getElementById('login-password').value;
            const errorMsg = document.getElementById('login-error');

            const result = login(identifier, password);
            if (result.success) {
                updateAuthUI();
                window.location.href = 'index.html';
            } else {
                if (errorMsg) {
                    errorMsg.textContent = result.message;
                    errorMsg.classList.add('show');
                }
            }
        });
    }

    // Signup form
    const signupForm = document.getElementById('signup-form-element');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const mobile = document.getElementById('signup-mobile').value;
            const password = document.getElementById('signup-password').value;
            const errorMsg = document.getElementById('signup-error');

            const result = signup(name, email, mobile, password);
            if (result.success) {
                updateAuthUI();
                window.location.href = 'index.html';
            } else {
                if (errorMsg) {
                    errorMsg.textContent = result.message;
                    errorMsg.classList.add('show');
                }
            }
        });
    }

    // Google login buttons
    const googleLoginBtn = document.getElementById('google-login-btn');
    const googleSignupBtn = document.getElementById('google-signup-btn');

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            const result = mockGoogleLogin();
            if (result.success) {
                updateAuthUI();
                window.location.href = 'index.html';
            }
        });
    }

    if (googleSignupBtn) {
        googleSignupBtn.addEventListener('click', () => {
            const result = mockGoogleLogin();
            if (result.success) {
                updateAuthUI();
                window.location.href = 'index.html';
            }
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Auth tabs
    const authTabs = document.querySelectorAll('.auth-tab-btn');
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show/hide forms
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            document.getElementById(`${tabName}-form`).classList.add('active');
        });
    });
}

// Protect admin routes
function protectAdminRoute() {
    const currentUser = checkAuth();
    if (!currentUser) {
        window.location.href = 'login.html';
        return false;
    }
    
    // Check if user has admin access (stored in session)
    const hasAdminAccess = sessionStorage.getItem('grocery_adminAccess') === 'true';
    
    if (!hasAdminAccess) {
        // Check admin password
        const adminPassword = localStorage.getItem('grocery_adminPassword');
        const enteredPassword = prompt('Enter admin password:');
        
        if (enteredPassword === adminPassword) {
            sessionStorage.setItem('grocery_adminAccess', 'true');
            return true;
        } else {
            alert('Access denied. Invalid admin password.');
            window.location.href = 'index.html';
            return false;
        }
    }
    
    return true;
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    setupAuthForms();
    
    // Protect admin page
    if (window.location.pathname.includes('admin.html')) {
        protectAdminRoute();
    }
});

