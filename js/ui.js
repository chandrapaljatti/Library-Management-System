const ui = {
    pages: {
        'student-login': () => `
            <div class="auth-container">
                <div class="auth-card">
                    <h2>Student Login</h2>
                    <p class="subtitle">Enter your credentials to access your library account</p>
                    <form id="student-login-form">
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" id="login-username" class="form-input" placeholder="e.g. y23cs001" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <div class="password-wrapper">
                                <input type="password" id="login-password" class="form-input" required>
                                <i class="fas fa-eye password-toggle" onclick="ui.togglePassword('login-password', this)"></i>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                    </form>
                    <div class="auth-footer">
                        Don't have an account? <a href="#" onclick="showPage('student-signup')">Sign Up</a>
                    </div>
                </div>
            </div>
        `,

        'student-signup': () => `
            <div class="auth-container">
                <div class="auth-card">
                    <h2>Student Sign Up</h2>
                    <p class="subtitle">Create your library account</p>
                    <form id="student-signup-form">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="signup-fullname" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" id="signup-username" class="form-input" placeholder="e.g. y23cs001" required>
                        </div>
                        <div class="form-group">
                            <label>Branch</label>
                            <select id="signup-branch" class="form-input" required style="appearance: auto;">
                                <option value="CSE">CSE</option>
                                <option value="ECE">ECE</option>
                                <option value="IT">IT</option>
                                <option value="EEE">EEE</option>
                                <option value="ME">ME</option>
                                <option value="CSD">CSD</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <div class="password-wrapper">
                                <input type="password" id="signup-password" class="form-input" required>
                                <i class="fas fa-eye password-toggle" onclick="ui.togglePassword('signup-password', this)"></i>
                            </div>
                            <span class="error-msg">Minimum 6 characters required</span>
                        </div>
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <div class="password-wrapper">
                                <input type="password" id="signup-confirm" class="form-input" required>
                                <i class="fas fa-eye password-toggle" onclick="ui.togglePassword('signup-confirm', this)"></i>
                            </div>
                            <span class="error-msg">Passwords do not match</span>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Create Account</button>
                    </form>
                    <div class="auth-footer">
                        Already have an account? <a href="#" onclick="showPage('student-login')">Login</a>
                    </div>
                </div>
            </div>
        `,

        'librarian-login': () => `
            <div class="auth-container">
                <div class="auth-card">
                    <h2>Librarian Login</h2>
                    <p class="subtitle">Administrative access only</p>
                    <form id="librarian-login-form">
                        <div class="form-group">
                            <label>Official Email</label>
                            <input type="email" id="lib-username" class="form-input" placeholder="chandrapal@gmail.com" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <div class="password-wrapper">
                                <input type="password" id="lib-password" class="form-input" required>
                                <i class="fas fa-eye password-toggle" onclick="ui.togglePassword('lib-password', this)"></i>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-secondary w-100">Admin Login</button>
                    </form>
                    <div class="auth-footer">
                        <a href="#" onclick="showPage('landing-page')">Back to Home</a>
                    </div>
                </div>
            </div>
        `,

        'student-dashboard': () => `
            <div class="dashboard-header">
                <h1>Welcome, <span id="dash-user-name">Student</span></h1>
                <p>Explore our vast collection of knowledge.</p>
            </div>
            <div class="stats-grid">
                <div class="stat-card" style="cursor: pointer;" onclick="ui.renderStudentProfile('loans')">
                    <i class="fas fa-book"></i>
                    <div class="stat-info">
                        <h3 id="stat-borrowed-books">0</h3>
                        <p>Books Borrowed</p>
                    </div>
                </div>
                <div class="stat-card" style="cursor: pointer;" onclick="ui.renderStudentProfile('wishlist')">
                    <i class="fas fa-heart"></i>
                    <div class="stat-info">
                        <h3 id="stat-wishlist">0</h3>
                        <p>Wishlist</p>
                    </div>
                </div>
                <div class="stat-card" style="cursor: pointer;" onclick="ui.renderStudentProfile('fines')">
                    <i class="fas fa-wallet"></i>
                    <div class="stat-info">
                        <h3 id="stat-fines">₹0</h3>
                        <p>Outstanding Fines</p>
                    </div>
                </div>
            </div>
            <div class="section-title">
                <h2>Popular Collections</h2>
                <button class="btn-text" onclick="ui.renderStudentCatalog()">View All</button>
            </div>
            <div id="popular-books-grid" class="book-grid">
                <!-- Books will be injected here -->
            </div>
        `,

        'librarian-dashboard': () => `
            <div class="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>System overview and management center.</p>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <i class="fas fa-books"></i>
                    <div class="stat-info">
                        <h3 id="stat-total-books">0</h3>
                        <p>Total Books</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <div class="stat-info">
                        <h3 id="stat-total-users">0</h3>
                        <p>Active Students</p>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-exchange-alt"></i>
                    <div class="stat-info">
                        <h3 id="stat-active-loans">0</h3>
                        <p>Active Issues</p>
                    </div>
                </div>
            </div>
            
            <div id="reservation-alert" class="hidden" style="margin-bottom: 20px;">
                <!-- Reservation alert injected here -->
            </div>
            
            <div class="admin-actions">
                <div class="action-card" onclick="ui.renderAddBookForm()">
                    <i class="fas fa-plus"></i>
                    <h3>Add New Book</h3>
                    <p>Register a new title to the catalog</p>
                </div>
                <div class="action-card" onclick="ui.renderUserManagement()">
                    <i class="fas fa-user-plus"></i>
                    <h3>Create User</h3>
                    <p>Manually add students or staff</p>
                </div>
                <div class="action-card" onclick="ui.renderIssueBookForm()">
                    <i class="fas fa-check-circle"></i>
                    <h3>Issue Book</h3>
                    <p>Check out a book to a student</p>
                </div>
                <div class="action-card" onclick="ui.renderReturnBookForm()">
                    <i class="fas fa-undo"></i>
                    <h3>Return Book</h3>
                    <p>Process a book return and update stock</p>
                </div>
            </div>
        `
    },

    renderPage: async (pageId) => {
        const main = document.getElementById('main-content');
        const sections = document.querySelectorAll('section');

        sections.forEach(s => s.classList.add('hidden'));

        let targetSection = document.getElementById(pageId);
        if (!targetSection) {
            // Create dynamic section if it doesn't exist
            targetSection = document.createElement('section');
            targetSection.id = pageId;
            main.appendChild(targetSection);
        }

        targetSection.classList.remove('hidden');
        if (ui.pages[pageId]) {
            targetSection.innerHTML = ui.pages[pageId]();
            ui.attachEvents(pageId);
        }

        // Sidebar logic
        const sidebar = document.getElementById('sidebar');
        const isDashboard = ['student-dashboard', 'librarian-dashboard'].includes(pageId) || pageId.includes('admin') || pageId.includes('student');

        if (isDashboard && auth.currentUser) {
            sidebar.classList.remove('hidden');
            main.classList.remove('no-sidebar');
            ui.renderSidebarContent();
        } else if (!pageId.includes('login') && !pageId.includes('signup') && pageId !== 'landing-page') {
            // Keep sidebar for inner dashboard pages
            sidebar.classList.remove('hidden');
            main.classList.remove('no-sidebar');
        } else {
            sidebar.classList.add('hidden');
            main.classList.add('no-sidebar');
        }

        // Initialize dashboard data
        if (pageId === 'student-dashboard') ui.initStudentDashboard();
        if (pageId === 'librarian-dashboard') ui.initLibrarianDashboard();
    },

    togglePassword: (inputId, iconElement) => {
        const input = document.getElementById(inputId);
        if (input.type === 'password') {
            input.type = 'text';
            iconElement.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            iconElement.classList.replace('fa-eye-slash', 'fa-eye');
        }
    },

    attachEvents: (pageId) => {
        if (pageId === 'student-login') {
            document.getElementById('student-login-form').onsubmit = async (e) => {
                e.preventDefault();
                const user = document.getElementById('login-username').value;
                const pass = document.getElementById('login-password').value;

                if (!utils.validateStudentId(user)) {
                    document.getElementById('login-username').classList.add('invalid');
                    return;
                }

                utils.showLoader();
                const loggedIn = await auth.login(user, pass, 'student');
                utils.hideLoader();

                if (loggedIn) ui.renderPage('student-dashboard');
            };
        }

        if (pageId === 'student-signup') {
            document.getElementById('student-signup-form').onsubmit = async (e) => {
                e.preventDefault();
                const fullName = document.getElementById('signup-fullname').value;
                const username = document.getElementById('signup-username').value;
                const branch = document.getElementById('signup-branch').value;
                const password = document.getElementById('signup-password').value;
                const confirm = document.getElementById('signup-confirm').value;

                let isValid = true;

                if (!utils.validateStudentId(username)) {
                    document.getElementById('signup-username').classList.add('invalid');
                    isValid = false;
                }
                if (!utils.validatePassword(password)) {
                    document.getElementById('signup-password').classList.add('invalid');
                    isValid = false;
                }
                if (password !== confirm) {
                    document.getElementById('signup-confirm').classList.add('invalid');
                    isValid = false;
                }

                if (!isValid) return;

                utils.showLoader();
                const success = await auth.signup({ fullName, username, branch, password });
                utils.hideLoader();

                if (success) ui.renderPage('student-login');
            };
        }

        if (pageId === 'librarian-login') {
            document.getElementById('librarian-login-form').onsubmit = async (e) => {
                e.preventDefault();
                const user = document.getElementById('lib-username').value;
                const pass = document.getElementById('lib-password').value;

                utils.showLoader();
                const loggedIn = await auth.login(user, pass, 'librarian');
                utils.hideLoader();

                if (loggedIn) ui.renderPage('librarian-dashboard');
            };
        }
    },

    renderSidebarContent: () => {
        const user = auth.currentUser;
        if (!user) return;

        document.getElementById('sidebar-user-name').textContent = user.fullName || user.username;
        document.getElementById('sidebar-user-role').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
        const avatar = document.getElementById('user-avatar');
        if (avatar) avatar.textContent = (user.fullName || user.username).charAt(0).toUpperCase();

        const nav = document.querySelector('.sidebar-nav');
        if (user.role === 'student') {
            nav.innerHTML = `
                <a href="#" class="nav-item active" onclick="ui.renderPage('student-dashboard')"><i class="fas fa-home"></i> Home</a>
                <a href="#" class="nav-item" onclick="ui.renderStudentCatalog()"><i class="fas fa-search"></i> Catalog</a>
                <a href="#" class="nav-item" onclick="ui.renderStudentProfile()"><i class="fas fa-user"></i> Profile</a>
            `;
        } else {
            nav.innerHTML = `
                <a href="#" class="nav-item active" onclick="ui.renderPage('librarian-dashboard')"><i class="fas fa-chart-line"></i> Dashboard</a>
                <a href="#" class="nav-item" onclick="ui.renderAddBookForm()"><i class="fas fa-plus-circle"></i> Add Book</a>
                <a href="#" class="nav-item" onclick="ui.renderIssueBookForm()"><i class="fas fa-exchange-alt"></i> Issue/Return</a>
                <a href="#" class="nav-item" onclick="ui.renderFineManagement()"><i class="fas fa-file-invoice-dollar"></i> Manage Fines</a>
                <a href="#" class="nav-item" onclick="ui.renderUserManagement()"><i class="fas fa-users"></i> Manage Users</a>
            `;
        }
    },

    initStudentDashboard: async () => {
        const user = auth.currentUser;
        document.getElementById('dash-user-name').textContent = user.fullName;

        // Fetch transactions to update borrowed books stat
        const transactions = await transactionService.getUserTransactions(user.username);
        const activeLoans = transactions.filter(t => t.status === 'issued');
        document.getElementById('stat-borrowed-books').textContent = activeLoans.length;

        // Fetch wishlist items
        const wishlist = await dbOps.getByIndex(STORES.WISHLIST, 'username', user.username);
        document.getElementById('stat-wishlist').textContent = wishlist.length;

        // Fetch fines
        const fines = await transactionService.getUserFines(user.username);
        const pendingFines = fines.filter(f => f.status === 'pending');
        const totalFines = pendingFines.reduce((sum, f) => sum + f.amount, 0);
        document.getElementById('stat-fines').textContent = `₹${totalFines}`;

        const books = await bookService.getAllBooks();
        const grid = document.getElementById('popular-books-grid');
        const popular = books.slice(0, 4); // Show first 4 for now

        if (popular.length === 0) {
            grid.innerHTML = '<p class="text-muted">No books available in the collection yet.</p>';
            return;
        }

        grid.innerHTML = popular.map(book => ui.createBookCard(book)).join('');
    },

    initLibrarianDashboard: async () => {
        const books = await bookService.getAllBooks();
        const students = await userService.getAllStudents();
        const loans = await transactionService.getActiveLoans();

        document.getElementById('stat-total-books').textContent = books.length;
        document.getElementById('stat-total-users').textContent = students.length;
        document.getElementById('stat-active-loans').textContent = loans.length;

        // Check for pending reservations
        const holds = await dbOps.getAll(STORES.HOLDS);
        const pendingHolds = holds.filter(h => h.status === 'pending');
        const alertBox = document.getElementById('reservation-alert');

        if (pendingHolds.length > 0) {
            alertBox.classList.remove('hidden');
            const latestHold = pendingHolds[pendingHolds.length - 1]; // Show the most recent one
            const requestedBook = books.find(b => b.id === latestHold.bookId);

            alertBox.innerHTML = `
                <div class="toast info" style="position: relative; top: 0; right: 0; margin-bottom: 0px; border-left: 4px solid var(--accent-gold);">
                    <i class="fas fa-bell" style="margin-top: 4px;"></i>
                    <div style="flex: 1;">
                        <strong>New Reservation Request!</strong><br>
                        <span style="display: block; margin-bottom: 12px;">${latestHold.username} wants to borrow "${requestedBook ? requestedBook.title : 'Unknown Book'}".</span>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn btn-primary btn-sm" onclick="ui.renderIssueBookForm('${latestHold.username}', ${latestHold.bookId}, ${latestHold.id})">Accept</button>
                            <button class="btn btn-outline btn-sm" style="border-color: var(--error); color: var(--error);" onclick="ui.handleDeclineReservation(${latestHold.id})">Decline</button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            alertBox.classList.add('hidden');
        }
    },

    createBookCard: (book) => `
        <div class="book-card" onclick="ui.renderBookDetails('${book.id}')">
            <div class="book-cover">
                <div class="book-status ${book.available > 0 ? 'status-available' : 'status-unavailable'}">
                    ${book.available > 0 ? 'Available' : 'Out of Stock'}
                </div>
                <img src="${book.coverImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(book.title)}&background=random&color=fff&size=400&font-size=0.25&length=3`}" alt="${book.title}" style="object-fit: cover;">
            </div>
            <div class="book-info">
                <h4>${book.title}</h4>
                <p>${book.author}</p>
                <div class="book-rating">
                    <i class="fas fa-star"></i>
                    <span>${book.rating}</span>
                </div>
            </div>
        </div>
    `,

    renderAddBookForm: () => {
        ui.renderPage('admin-add-book');
        const section = document.getElementById('admin-add-book');
        section.innerHTML = `
            <div class="dashboard-header">
                <h1>Add New Book</h1>
                <p>Fill in the details to add a book to the library.</p>
            </div>
            <div class="auth-card" style="max-width: 600px; margin: 0;">
                <form id="add-book-form">
                    <div class="form-group">
                        <label>Book Title</label>
                        <input type="text" id="book-title" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label>Author</label>
                        <input type="text" id="book-author" class="form-input" required>
                    </div>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>Department</label>
                            <select id="book-dept" class="form-input" required style="appearance: auto;">
                                <option value="CSE">Computer Science</option>
                                <option value="ECE">Electronics</option>
                                <option value="IT">Information Technology</option>
                                <option value="ME">Mechanical</option>
                                <option value="EEE">Electrical</option>
                                <option value="CSD">CSD</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Quantity</label>
                            <input type="number" id="book-qty" class="form-input" min="1" required>
                        </div>
                    </div>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>Edition</label>
                            <input type="text" id="book-edition" class="form-input">
                        </div>
                        <div class="form-group">
                            <label>Year</label>
                            <input type="number" id="book-year" class="form-input" min="1900" max="2026">
                        </div>
                    </div>
                    <div class="form-group" style="display: flex; flex-direction: column; gap: 8px;">
                        <label>Cover Image (Optional)</label>
                        <input type="url" id="book-cover-url" class="form-input" placeholder="Enter Image URL (e.g. https://example.com/image.jpg)">
                        <div style="text-align: center; color: var(--text-muted); font-size: 0.9em; margin: 4px 0;">OR</div>
                        <input type="file" id="book-cover-file" class="form-input" accept="image/*" style="padding: 8px;">
                        <small class="text-muted" style="margin-top: 4px;">Provide a URL or upload a local image file.</small>
                    </div>
                    <button type="submit" class="btn btn-secondary w-100">Add Title</button>
                </form>
            </div>
        `;

        document.getElementById('add-book-form').onsubmit = async (e) => {
            e.preventDefault();

            let coverImageData = document.getElementById('book-cover-url').value;
            const coverFileInput = document.getElementById('book-cover-file');

            if (coverFileInput.files && coverFileInput.files[0]) {
                const getBase64 = (file) => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
                try {
                    coverImageData = await getBase64(coverFileInput.files[0]);
                } catch (error) {
                    utils.showToast("Failed to read image file", "error");
                    return;
                }
            }

            const data = {
                title: document.getElementById('book-title').value,
                author: document.getElementById('book-author').value,
                department: document.getElementById('book-dept').value,
                quantity: parseInt(document.getElementById('book-qty').value),
                edition: document.getElementById('book-edition').value,
                year: document.getElementById('book-year').value,
                coverImage: coverImageData
            };
            utils.showLoader();
            const success = await bookService.addBook(data);
            utils.hideLoader();
            if (success) ui.renderPage('librarian-dashboard');
        };
    },

    renderIssueBookForm: async (prefillUsername = '', prefillBookId = '', holdId = null) => {
        ui.renderPage('admin-issue-book');
        const students = await userService.getAllStudents();
        const books = await bookService.getAllBooks();

        const section = document.getElementById('admin-issue-book');
        section.innerHTML = `
            <div class="dashboard-header">
                <h1>Issue Book</h1>
                <p>Search student and select book to issue.</p>
            </div>
            <div class="auth-card" style="max-width: 600px; margin: 0;">
                <form id="issue-book-form">
                    ${holdId ? `<input type="hidden" id="issue-hold-id" value="${holdId}">` : ''}
                    <div class="form-group">
                        <label>Select Student</label>
                        <select id="issue-student" class="form-input" required style="appearance: auto;">
                            <option value="">-- Select Student --</option>
                            ${students.map(s => `<option value="${s.username}" ${s.username === prefillUsername ? 'selected' : ''}>${s.fullName} (${s.username})</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Select Book</label>
                        <select id="issue-book" class="form-input" required style="appearance: auto;">
                            <option value="">-- Select Book --</option>
                            ${books.filter(b => b.available > 0 || b.id == prefillBookId).map(b => `<option value="${b.id}" ${b.id == prefillBookId ? 'selected' : ''}>${b.title} (${b.available} left)</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Return Due Date</label>
                        <input type="date" id="issue-due-date" class="form-input" required>
                    </div>
                    <button type="submit" class="btn btn-secondary w-100">Issue Book</button>
                </form>
            </div>
        `;

        document.getElementById('issue-book-form').onsubmit = async (e) => {
            e.preventDefault();
            const student = document.getElementById('issue-student').value;
            const bookId = parseInt(document.getElementById('issue-book').value);
            const dueDate = document.getElementById('issue-due-date').value;
            const hId = document.getElementById('issue-hold-id') ? document.getElementById('issue-hold-id').value : null;

            utils.showLoader();
            const success = await transactionService.issueBook(student, bookId, dueDate, hId);
            utils.hideLoader();
            if (success) ui.renderPage('librarian-dashboard');
        };
    },

    renderStudentCatalog: async () => {
        ui.renderPage('student-catalog');
        const books = await bookService.getAllBooks();
        const section = document.getElementById('student-catalog');
        section.innerHTML = `
            <div class="dashboard-header">
                <h1>Library Catalog</h1>
                <div class="search-bar-container">
                    <input type="text" id="catalog-search" class="form-input" placeholder="Search by title, author or department...">
                    <i class="fas fa-search"></i>
                </div>
            </div>
            <div id="catalog-grid" class="book-grid">
                ${books.map(book => ui.createBookCard(book)).join('')}
            </div>
        `;

        document.getElementById('catalog-search').oninput = (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = books.filter(b =>
                b.title.toLowerCase().includes(query) ||
                b.author.toLowerCase().includes(query) ||
                b.department.toLowerCase().includes(query)
            );
            document.getElementById('catalog-grid').innerHTML = filtered.map(b => ui.createBookCard(b)).join('');
        };
    },

    renderBookDetails: async (bookId) => {
        const book = await dbOps.get(STORES.BOOKS, parseInt(bookId));
        const modal = document.getElementById('modal-container');
        modal.classList.remove('hidden');
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <button class="modal-close" onclick="document.getElementById('modal-container').classList.add('hidden')">&times;</button>
                    <div class="book-detail-layout">
                        <div class="book-detail-img">
                            <img src="${book.coverImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(book.title)}&background=random&color=fff&size=400&font-size=0.25&length=3`}" alt="${book.title}" style="object-fit: cover; width: 100%; aspect-ratio: 2/3;">
                        </div>
                        <div class="book-detail-info">
                            <h2>${book.title}</h2>
                            <p class="author">by ${book.author}</p>
                            <div class="book-meta">
                                <span><i class="fas fa-building"></i> ${book.department}</span>
                                <span><i class="fas fa-calendar"></i> ${book.year}</span>
                                <span><i class="fas fa-bookmark"></i> ${book.edition}</span>
                            </div>
                            <div class="availability-info">
                                <p>Status: <span class="${book.available > 0 ? 'text-success' : 'text-error'}">${book.available > 0 ? 'Available' : 'Out of Stock'}</span></p>
                                <p>Copies Left: ${book.available} / ${book.quantity}</p>
                            </div>
                            <div class="modal-actions">
                                <button class="btn btn-primary" ${book.available <= 0 ? 'disabled' : ''} onclick="ui.handleReserve('${book.id}')">Reserve Book</button>
                                <button class="btn btn-outline" onclick="ui.handleAddToWishlist('${book.id}')">Add to Wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    handleReserve: async (bookId) => {
        utils.showLoader();
        const success = await bookService.reserveBook(parseInt(bookId), auth.currentUser.username);
        utils.hideLoader();
        if (success) {
            document.getElementById('modal-container').classList.add('hidden');
            ui.renderPage('student-dashboard');
        }
    },

    handleDeclineReservation: async (holdId) => {
        utils.showLoader();
        try {
            const hold = await dbOps.get(STORES.HOLDS, holdId);
            if (hold) {
                hold.status = 'cancelled';
                await dbOps.put(STORES.HOLDS, hold);
                utils.showToast('Reservation declined', 'info');
                ui.renderPage('librarian-dashboard');
            }
        } catch (e) {
            utils.showToast(e.message, 'error');
        }
        utils.hideLoader();
    },

    renderStudentProfile: async (activeTab = 'loans') => {
        ui.renderPage('student-profile');
        const transactions = await transactionService.getUserTransactions(auth.currentUser.username);
        const fines = await transactionService.getUserFines(auth.currentUser.username);
        const section = document.getElementById('student-profile');

        section.innerHTML = `
            <div class="dashboard-header">
                <h1>My Profile</h1>
            </div>
            <div class="profile-layout">
                <div class="profile-card">
                    <div class="profile-avatar">${auth.currentUser.fullName.charAt(0)}</div>
                    <h3>${auth.currentUser.fullName}</h3>
                    <p>${auth.currentUser.username} | ${auth.currentUser.branch}</p>
                </div>
                <div class="profile-data">
                    <div class="tabs">
                        <button class="tab active" onclick="ui.switchProfileTab('loans', this)">Borrowed Books</button>
                        <button class="tab" onclick="ui.switchProfileTab('wishlist', this)">Wishlist</button>
                        <button class="tab" onclick="ui.switchProfileTab('fines', this)">Fines</button>
                    </div>
                    <div class="tab-content" id="profile-tab-content">
                        <!-- Content injected by ui.switchProfileTab -->
                    </div>
                </div>
                </div>
            </div>
        `;
        // Load default tab
        const tabToActivate = document.querySelector(`.tabs .tab[onclick*="'${activeTab}'"]`);
        ui.switchProfileTab(activeTab, tabToActivate || document.querySelector('.tabs .tab.active'));
    },

    switchProfileTab: async (tabName, btnElement) => {
        // Update active tab styles
        document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
        btnElement.classList.add('active');

        const content = document.getElementById('profile-tab-content');

        if (tabName === 'loans') {
            const transactions = await transactionService.getUserTransactions(auth.currentUser.username);
            content.innerHTML = `
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>Issue Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions.map(t => `
                            <tr>
                                <td>${t.bookId}</td>
                                <td>${utils.formatDate(t.issueDate)}</td>
                                <td>${utils.formatDate(t.dueDate)}</td>
                                <td><span class="badge ${t.status}">${t.status}</span></td>
                            </tr>
                        `).join('')}
                        ${transactions.length === 0 ? '<tr><td colspan="4">No transactions found</td></tr>' : ''}
                    </tbody>
                </table>
            `;
        } else if (tabName === 'wishlist') {
            const wishlist = await dbOps.getByIndex(STORES.WISHLIST, 'username', auth.currentUser.username);
            const books = await bookService.getAllBooks();
            const wishlistBooks = wishlist.map(w => books.find(b => b.id === parseInt(w.bookId))).filter(Boolean);

            content.innerHTML = `
                <div class="book-grid" style="grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));">
                    ${wishlistBooks.map(book => ui.createBookCard(book)).join('')}
                    ${wishlistBooks.length === 0 ? '<p class="text-muted" style="grid-column: 1/-1;">Your wishlist is empty.</p>' : ''}
                </div>
            `;
        } else if (tabName === 'fines') {
            const fines = await transactionService.getUserFines(auth.currentUser.username);
            content.innerHTML = `
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${fines.map(f => `
                            <tr>
                                <td>₹${f.amount}</td>
                                <td>${utils.formatDate(f.date)}</td>
                                <td><span class="badge ${f.status}">${f.status}</span></td>
                            </tr>
                        `).join('')}
                        ${fines.length === 0 ? '<tr><td colspan="3">No fines recorded</td></tr>' : ''}
                    </tbody>
                </table>
            `;
        }
    },

    handleAddToWishlist: async (bookId) => {
        utils.showLoader();
        try {
            const existing = await dbOps.getByIndex(STORES.WISHLIST, 'username', auth.currentUser.username);
            if (existing.some(w => w.bookId === parseInt(bookId))) {
                throw new Error("Book is already in your wishlist.");
            }

            await dbOps.add(STORES.WISHLIST, {
                bookId: parseInt(bookId),
                username: auth.currentUser.username,
                addedAt: new Date().toISOString()
            });

            utils.showToast('Book added to wishlist!', 'success');
        } catch (error) {
            utils.showToast(error.message, 'error');
        }
        utils.hideLoader();
    },

    renderUserManagement: async () => {
        ui.renderPage('admin-users');
        const users = await userService.getAllStudents();
        const section = document.getElementById('admin-users');
        section.innerHTML = `
            <div class="dashboard-header">
                <h1>User Management</h1>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Branch</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map(u => `
                        <tr>
                            <td>${u.username}</td>
                            <td>${u.fullName}</td>
                            <td>${u.branch}</td>
                            <td><span class="badge ${u.status}">${u.status}</span></td>
                            <td>
                                <button class="btn-icon" onclick="ui.toggleUserStatus('${u.username}', '${u.status}')" title="${u.status === 'active' ? 'Suspend' : 'Activate'}">
                                    <i class="fas fa-${u.status === 'active' ? 'user-slash' : 'user-check'}"></i>
                                </button>
                                <button class="btn-icon text-error" onclick="ui.handleDeleteUser('${u.username}')" title="Delete User">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    toggleUserStatus: async (username, currentStatus) => {
        const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
        utils.showLoader();
        await userService.updateUserStatus(username, nextStatus);
        utils.hideLoader();
        ui.renderUserManagement();
    },

    handleDeleteUser: async (username) => {
        if (!confirm(`Are you sure you want to delete user ${username}? This action cannot be undone.`)) return;
        utils.showLoader();
        try {
            await dbOps.delete(STORES.USERS, username);
            utils.showToast('User deleted successfully', 'success');
            ui.renderUserManagement();
        } catch (e) {
            utils.showToast(e.message, 'error');
        }
        utils.hideLoader();
    },

    renderReturnBookForm: async () => {
        ui.renderPage('admin-return-book');
        const transactions = await transactionService.getActiveLoans();
        const section = document.getElementById('admin-return-book');
        section.innerHTML = `
            <div class="dashboard-header">
                <h1>Return Book</h1>
            </div>
            <div class="auth-card" style="max-width: 800px; margin: 0;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Book ID</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions.map(t => `
                            <tr>
                                <td>${t.username}</td>
                                <td>${t.bookId}</td>
                                <td>${utils.formatDate(t.dueDate)}</td>
                                <td class="actions-cell">
                                    <button class="btn btn-primary btn-sm" onclick="ui.handleReturn(${t.id})">Return</button>
                                    <button class="btn btn-outline btn-sm" onclick="ui.handleRenew(${t.id})">Renew</button>
                                </td>
                            </tr>
                        `).join('')}
                        ${transactions.length === 0 ? '<tr><td colspan="4">No borrowed books</td></tr>' : ''}
                    </tbody>
                </table>
            </div>
        `;
    },

    handleRenew: async (transId) => {
        const trans = await dbOps.get(STORES.TRANSACTIONS, transId);
        const newDueDate = new Date(trans.dueDate);
        newDueDate.setDate(newDueDate.getDate() + 7); // Extend by 7 days

        trans.dueDate = newDueDate.toISOString();
        utils.showLoader();
        await dbOps.put(STORES.TRANSACTIONS, trans);
        utils.hideLoader();
        utils.showToast('Book renewed for 7 days', 'success');
        ui.renderReturnBookForm();
    },

    renderFineManagement: async () => {
        ui.renderPage('admin-fines');
        const fines = await dbOps.getAll(STORES.FINES);
        const section = document.getElementById('admin-fines');
        section.innerHTML = `
            <div class="dashboard-header">
                <h1>Fine Management</h1>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${fines.map(f => `
                        <tr>
                            <td>${f.username}</td>
                            <td>₹${f.amount}</td>
                            <td>${utils.formatDate(f.date)}</td>
                            <td><span class="badge ${f.status}">${f.status}</span></td>
                            <td>
                                ${f.status === 'pending' ? `<button class="btn btn-secondary btn-sm" onclick="ui.markFinePaid(${f.id})">Mark Paid</button>` : 'Paid'}
                            </td>
                        </tr>
                    `).join('')}
                    ${fines.length === 0 ? '<tr><td colspan="5">No fines recorded</td></tr>' : ''}
                </tbody>
            </table>
        `;
    },

    markFinePaid: async (fineId) => {
        utils.showLoader();
        const fine = await dbOps.get(STORES.FINES, fineId);
        fine.status = 'paid';
        await dbOps.put(STORES.FINES, fine);
        utils.hideLoader();
        utils.showToast('Fine marked as paid', 'success');
        ui.renderFineManagement();
    },

    handleReturn: async (transId) => {
        utils.showLoader();
        await transactionService.returnBook(transId);
        utils.hideLoader();
        ui.renderReturnBookForm();
    }
};

