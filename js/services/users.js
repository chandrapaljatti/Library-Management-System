const userService = {
    getAllStudents: async () => {
        return await dbOps.getByIndex(STORES.USERS, 'role', 'student');
    },

    createUser: async (userData) => {
        try {
            await dbOps.add(STORES.USERS, {
                ...userData,
                role: 'student',
                createdAt: new Date().toISOString(),
                status: 'active'
            });
            utils.showToast('User created successfully', 'success');
            return true;
        } catch (error) {
            utils.showToast(error.message, 'error');
            return false;
        }
    },

    updateUserStatus: async (username, status) => {
        try {
            const user = await dbOps.get(STORES.USERS, username);
            user.status = status;
            await dbOps.put(STORES.USERS, user);
            utils.showToast(`User ${status} successfully`, 'success');
            return true;
        } catch (error) {
            utils.showToast(error.message, 'error');
            return false;
        }
    }
};
