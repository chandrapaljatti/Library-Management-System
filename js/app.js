// Global navigation helper
window.showPage = (pageId) => {
    ui.renderPage(pageId);
};

document.addEventListener('DOMContentLoaded', async () => {
    utils.showLoader();

    try {
        // RICH BOOK REGISTRY: This ensures the project looks "wow" even if the Supabase tables are minimal.
        // It maps book titles to their realistic images, departments, and quantities.
        window.bookRegistry = {
            "Clean Code": { department: "CSE", quantity: 5, year: 2008, edition: "1st", coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Design Patterns": { department: "CSE", quantity: 3, year: 1994, edition: "1st", coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Introduction to Algorithms": { department: "CSE", quantity: 4, year: 2009, edition: "3rd", coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Microelectronic Circuits": { department: "ECE", quantity: 6, year: 2014, edition: "7th", coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Digital Design": { department: "ECE", quantity: 5, year: 2012, edition: "5th", coverImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Signals and Systems": { department: "ECE", quantity: 3, year: 1996, edition: "2nd", coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Computer Networking": { department: "IT", quantity: 7, year: 2012, edition: "6th", coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Database System Concepts": { department: "IT", quantity: 5, year: 2010, edition: "6th", coverImage: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Cloud Computing": { department: "IT", quantity: 4, year: 2013, edition: "1st", coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Fluid Mechanics": { department: "ME", quantity: 3, year: 2010, edition: "7th", coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Thermodynamics": { department: "ME", quantity: 4, year: 2014, edition: "8th", coverImage: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Machine Design": { department: "ME", quantity: 5, year: 2013, edition: "5th", coverImage: "https://images.unsplash.com/photo-1504917596155-27a96860f38b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Electric Machinery Fundamentals": { department: "EEE", quantity: 4, year: 2011, edition: "5th", coverImage: "https://images.unsplash.com/photo-1574041695435-01589fe9e5b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Power System Analysis": { department: "EEE", quantity: 3, year: 1994, edition: "1st", coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Control Systems Engineering": { department: "EEE", quantity: 5, year: 2015, edition: "7th", coverImage: "https://images.unsplash.com/photo-1580894732444-8ecbef79bd14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Data Science from Scratch": { department: "CSD", quantity: 5, year: 2019, edition: "2nd", coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Python for Data Analysis": { department: "CSD", quantity: 4, year: 2017, edition: "2nd", coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Deep Learning": { department: "CSD", quantity: 3, year: 2016, edition: "1st", coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Pattern Recognition": { department: "CSD", quantity: 2, year: 2006, edition: "1st", coverImage: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Artificial Intelligence": { department: "CSD", quantity: 6, year: 2020, edition: "4th", coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "The Pragmatic Programmer": { department: "CSE", quantity: 4, year: 2019, edition: "2nd", coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Computer Architecture": { department: "ECE", quantity: 3, year: 2017, edition: "6th", coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Operating System Concepts": { department: "IT", quantity: 5, year: 2018, edition: "10th", coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Theory of Machines": { department: "ME", quantity: 6, year: 2019, edition: "5th", coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Power Electronics": { department: "EEE", quantity: 4, year: 2018, edition: "6th", coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Machine Learning Concepts": { department: "CSD", quantity: 5, year: 1997, edition: "1st", coverImage: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Head First Java": { department: "CSE", quantity: 4, year: 2005, edition: "2nd", coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Wireless Communications": { department: "ECE", quantity: 3, year: 2001, edition: "2nd", coverImage: "https://images.unsplash.com/photo-1580828369019-2238ef8147d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Cyber Security Fundamentals": { department: "IT", quantity: 5, year: 2018, edition: "8th", coverImage: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            "Automobile Engineering": { department: "ME", quantity: 4, year: 2012, edition: "13th", coverImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
        };

        // Seed initial librarian if it doesn't exist
        await auth.createLibrarian();
        await bookService.seedBooks();

        const user = await auth.init();

        if (user) {
            if (user.role === 'admin' || user.role === 'librarian') {
                ui.renderPage('librarian-dashboard');
            } else {
                ui.renderPage('student-dashboard');
            }
        } else {
            ui.renderPage('landing-page');
        }
    } catch (error) {
        console.error('Initialization error:', error);
        utils.showToast('Initialization failed. Using offline mode.', 'warning');
        ui.renderPage('landing-page');
    } finally {
        utils.hideLoader();
    }
});
