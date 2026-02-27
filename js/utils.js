const utils = {
    showLoader: () => document.getElementById('loader').classList.remove('hidden'),
    hideLoader: () => document.getElementById('loader').classList.add('hidden'),

    showToast: (message, type = 'info') => {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        if (type === 'warning') icon = 'exclamation-triangle';

        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(new Date(date));
    },

    validateStudentId: (id) => id.trim().length > 0,

    validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),

    validatePassword: (pass) => {
        return pass.trim().length >= 6;
    },

    generateId: () => Math.random().toString(36).substr(2, 9),

    calculateFine: (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        if (today <= due) return 0;

        const diffTime = Math.abs(today - due);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays * 10; // ₹10 per day
    }
};
