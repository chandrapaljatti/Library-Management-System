const auth = {
    currentUser: null,

    init: async () => {
        const session = localStorage.getItem('bw_session');
        if (session) {
            const userData = JSON.parse(session);
            // Verify if user still exists
            const user = await dbOps.get(STORES.USERS, userData.username);
            if (user) {
                auth.currentUser = user;
                return user;
            } else {
                auth.logout();
            }
        }
        return null;
    },

    signup: async (userData) => {
        try {
            // Check if user already exists
            const existing = await dbOps.get(STORES.USERS, userData.username);
            if (existing) throw new Error('Username already exists');

            await dbOps.add(STORES.USERS, {
                ...userData,
                role: 'student',
                createdAt: new Date().toISOString(),
                status: 'active'
            });
            utils.showToast('Signup successful! Please login.', 'success');
            return true;
        } catch (error) {
            utils.showToast(error.message, 'error');
            return false;
        }
    },

    login: async (username, password, expectedRole) => {
        try {
            const user = await dbOps.get(STORES.USERS, username);
            if (!user) throw new Error('User not found');
            if (user.password !== password) throw new Error('Invalid password');
            if (user.role !== expectedRole) throw new Error('Unauthorized access');
            if (user.status === 'suspended') throw new Error('Account suspended. Contact librarian.');

            auth.currentUser = user;
            localStorage.setItem('bw_session', JSON.stringify({
                username: user.username,
                role: user.role
            }));
            utils.showToast(`Welcome back, ${user.fullName || user.username}!`, 'success');
            return user;
        } catch (error) {
            utils.showToast(error.message, 'error');
            return null;
        }
    },

    logout: () => {
        auth.currentUser = null;
        localStorage.removeItem('bw_session');
        location.reload();
    },

    createLibrarian: async () => {
        // Force upsert the admin to ensure credentials match user request
        await dbOps.put(STORES.USERS, {
            username: 'chandrapal@gmail.com',
            password: 'chan@074',
            role: 'librarian',
            fullName: 'System Admin',
            createdAt: new Date().toISOString(),
            status: 'active'
        });

        // Remove old generic librarian if it exists to avoid confusion
        try {
            await dbOps.delete(STORES.USERS, 'librarian@bookworld.com');
        } catch (e) { }
    }
};
