const bookService = {
    addBook: async (bookData) => {
        try {
            await dbOps.add(STORES.BOOKS, {
                title: bookData.title,
                author: bookData.author,
                department: bookData.department,
                quantity: bookData.quantity,
                available: bookData.quantity,
                edition: bookData.edition,
                year: bookData.year,
                coverImage: bookData.coverImage,
                issued: 0
            });
            utils.showToast('Book added successfully!', 'success');
            return true;
        } catch (error) {
            utils.showToast('Error adding book: ' + error.message, 'error');
            return false;
        }
    },

    getAllBooks: async () => {
        return await dbOps.getAll(STORES.BOOKS);
    },

    deleteBook: async (id) => {
        try {
            await dbOps.delete(STORES.BOOKS, id);
            utils.showToast('Book removed successfully!', 'success');
            return true;
        } catch (error) {
            utils.showToast('Error removing book', 'error');
            return false;
        }
    },

    reserveBook: async (bookId, username) => {
        try {
            const book = await dbOps.get(STORES.BOOKS, bookId);
            if (!book || book.available <= 0) {
                throw new Error('Book is currently unavailable');
            }

            // Update availability in book table
            book.available -= 1;
            await dbOps.put(STORES.BOOKS, book);

            await dbOps.add(STORES.HOLDS, {
                bookId,
                username,
                status: 'pending',
                date: new Date().toISOString()
            });

            utils.showToast('Book reserved successfully!', 'success');
            return true;
        } catch (error) {
            utils.showToast(error.message, 'error');
            return false;
        }
    },

    seedBooks: async () => {
        const books = await dbOps.getAll(STORES.BOOKS);
        if (books.length > 0) return; // Already seeded

        const initialBooks = [
            { title: "Clean Code", author: "Robert C. Martin", department: "CSE", quantity: 5, edition: "1st", year: 2008, coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Design Patterns", author: "Gang of Four", department: "CSE", quantity: 3, edition: "1st", year: 1994, coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Introduction to Algorithms", author: "Thomas H. Cormen", department: "CSE", quantity: 4, edition: "3rd", year: 2009, coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Microelectronic Circuits", author: "Adel S. Sedra", department: "ECE", quantity: 6, edition: "7th", year: 2014, coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Digital Design", author: "M. Morris Mano", department: "ECE", quantity: 5, edition: "5th", year: 2012, coverImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Signals and Systems", author: "Alan V. Oppenheim", department: "ECE", quantity: 3, edition: "2nd", year: 1996, coverImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Computer Networking", author: "James F. Kurose", department: "IT", quantity: 7, edition: "6th", year: 2012, coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Database System Concepts", author: "Abraham Silberschatz", department: "IT", quantity: 5, edition: "6th", year: 2010, coverImage: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Cloud Computing", author: "Thomas Erl", department: "IT", quantity: 4, edition: "1st", year: 2013, coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Fluid Mechanics", author: "Frank M. White", department: "ME", quantity: 3, edition: "7th", year: 2010, coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Thermodynamics", author: "Yunus A. Cengel", department: "ME", quantity: 4, edition: "8th", year: 2014, coverImage: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Machine Design", author: "Robert L. Norton", department: "ME", quantity: 5, edition: "5th", year: 2013, coverImage: "https://images.unsplash.com/photo-1504917596155-27a96860f38b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Electric Machinery Fundamentals", author: "Stephen J. Chapman", department: "EEE", quantity: 4, edition: "5th", year: 2011, coverImage: "https://images.unsplash.com/photo-1574041695435-01589fe9e5b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Power System Analysis", author: "John Grainger", department: "EEE", quantity: 3, edition: "1st", year: 1994, coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Control Systems Engineering", author: "Norman S. Nise", department: "EEE", quantity: 5, edition: "7th", year: 2015, coverImage: "https://images.unsplash.com/photo-1580894732444-8ecbef79bd14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Data Science from Scratch", author: "Joel Grus", department: "CSD", quantity: 5, edition: "2nd", year: 2019, coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Python for Data Analysis", author: "Wes McKinney", department: "CSD", quantity: 4, edition: "2nd", year: 2017, coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Deep Learning", author: "Ian Goodfellow", department: "CSD", quantity: 3, edition: "1st", year: 2016, coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Pattern Recognition", author: "Christopher M. Bishop", department: "CSD", quantity: 2, edition: "1st", year: 2006, coverImage: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Artificial Intelligence", author: "Stuart Russell", department: "CSD", quantity: 6, edition: "4th", year: 2020, coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "The Pragmatic Programmer", author: "Andrew Hunt", department: "CSE", quantity: 4, edition: "2nd", year: 2019, coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Computer Architecture", author: "John L. Hennessy", department: "ECE", quantity: 3, edition: "6th", year: 2017, coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Operating System Concepts", author: "Abraham Silberschatz", department: "IT", quantity: 5, edition: "10th", year: 2018, coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Theory of Machines", author: "S.S. Rattan", department: "ME", quantity: 6, edition: "5th", year: 2019, coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Power Electronics", author: "P.S. Bimbhra", department: "EEE", quantity: 4, edition: "6th", year: 2018, coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Machine Learning Concepts", author: "Tom M. Mitchell", department: "CSD", quantity: 5, edition: "1st", year: 1997, coverImage: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Head First Java", author: "Kathy Sierra", department: "CSE", quantity: 4, edition: "2nd", year: 2005, coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Wireless Communications", author: "Theodore S. Rappaport", department: "ECE", quantity: 3, edition: "2nd", year: 2001, coverImage: "https://images.unsplash.com/photo-1580828369019-2238ef8147d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Cyber Security Fundamentals", author: "William Stallings", department: "IT", quantity: 5, edition: "8th", year: 2018, coverImage: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
            { title: "Automobile Engineering", author: "Kirpal Singh", department: "ME", quantity: 4, edition: "13th", year: 2012, coverImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
        ];

        for (const book of initialBooks) {
            await dbOps.add(STORES.BOOKS, {
                title: book.title,
                author: book.author,
                department: book.department,
                quantity: book.quantity,
                available: book.quantity,
                issued: 0,
                edition: book.edition,
                year: book.year,
                coverImage: book.coverImage
            });
        }
        console.log('Seeded 30 books (Full data)');
    },

    restockBooks: async () => {
        const books = await dbOps.getAll(STORES.BOOKS);
        for (const book of books) {
            const richData = (window.bookRegistry && window.bookRegistry[book.title]) || {};
            book.quantity = richData.quantity || book.quantity || 5;
            book.available = book.quantity;
            book.issued = 0;
            await dbOps.put(STORES.BOOKS, book);
        }
        utils.showToast('All books restocked to default levels!', 'success');
        return true;
    }
};
