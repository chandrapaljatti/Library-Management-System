// Global navigation helper
window.showPage = (pageId) => {
    ui.renderPage(pageId);
};

document.addEventListener('DOMContentLoaded', async () => {
    utils.showLoader();

    // Seed initial librarian if it doesn't exist
    await auth.createLibrarian();
    await bookService.seedBooks();

    const user = await auth.init();
    utils.hideLoader();

    if (user) {
        if (user.role === 'student') {
            ui.renderPage('student-dashboard');
        } else {
            ui.renderPage('librarian-dashboard');
        }
    } else {
        ui.renderPage('landing-page');
    }

    // Event Delegation for logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        auth.logout();
    });
});
