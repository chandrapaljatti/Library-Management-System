const bookService = {
    addBook: async (bookData) => {
        try {
            await dbOps.add(STORES.BOOKS, {
                ...bookData,
                available: bookData.quantity,
                issued: 0,
                rating: 4.5, // Default rating
                createdAt: new Date().toISOString()
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
            if (book.available <= 0) throw new Error('Book currently unavailable');

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
            { title: "Clean Code", author: "Robert C. Martin", department: "CSE", quantity: 5, edition: "1st", year: 2008 },
            { title: "Design Patterns", author: "Gang of Four", department: "CSE", quantity: 3, edition: "1st", year: 1994 },
            { title: "Introduction to Algorithms", author: "Thomas H. Cormen", department: "CSE", quantity: 4, edition: "3rd", year: 2009 },
            { title: "Microelectronic Circuits", author: "Adel S. Sedra", department: "ECE", quantity: 6, edition: "7th", year: 2014 },
            { title: "Digital Design", author: "M. Morris Mano", department: "ECE", quantity: 5, edition: "5th", year: 2012 },
            { title: "Signals and Systems", author: "Alan V. Oppenheim", department: "ECE", quantity: 3, edition: "2nd", year: 1996 },
            { title: "Computer Networking", author: "James F. Kurose", department: "IT", quantity: 7, edition: "6th", year: 2012 },
            { title: "Database System Concepts", author: "Abraham Silberschatz", department: "IT", quantity: 5, edition: "6th", year: 2010 },
            { title: "Cloud Computing", author: "Thomas Erl", department: "IT", quantity: 4, edition: "1st", year: 2013 },
            { title: "Fluid Mechanics", author: "Frank M. White", department: "ME", quantity: 3, edition: "7th", year: 2010 },
            { title: "Thermodynamics", author: "Yunus A. Cengel", department: "ME", quantity: 4, edition: "8th", year: 2014 },
            { title: "Machine Design", author: "Robert L. Norton", department: "ME", quantity: 5, edition: "5th", year: 2013 },
            { title: "Electric Machinery Fundamentals", author: "Stephen J. Chapman", department: "EEE", quantity: 4, edition: "5th", year: 2011 },
            { title: "Power System Analysis", author: "John Grainger", department: "EEE", quantity: 3, edition: "1st", year: 1994 },
            { title: "Control Systems Engineering", author: "Norman S. Nise", department: "EEE", quantity: 5, edition: "7th", year: 2015 },
            { title: "Data Science from Scratch", author: "Joel Grus", department: "CSD", quantity: 5, edition: "2nd", year: 2019 },
            { title: "Python for Data Analysis", author: "Wes McKinney", department: "CSD", quantity: 4, edition: "2nd", year: 2017 },
            { title: "Deep Learning", author: "Ian Goodfellow", department: "CSD", quantity: 3, edition: "1st", year: 2016 },
            { title: "Pattern Recognition", author: "Christopher M. Bishop", department: "CSD", quantity: 2, edition: "1st", year: 2006 },
            { title: "Artificial Intelligence", author: "Stuart Russell", department: "CSD", quantity: 6, edition: "4th", year: 2020 }
        ];

        for (const book of initialBooks) {
            await dbOps.add(STORES.BOOKS, {
                ...book,
                available: book.quantity,
                issued: 0,
                rating: (4.0 + Math.random()).toFixed(1),
                createdAt: new Date().toISOString()
            });
        }
        console.log('Seeded 20 initial books across all branches');
    }
};
