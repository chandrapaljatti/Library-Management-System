const transactionService = {
    issueBook: async (username, bookId, returnDate, holdId = null) => {
        try {
            const book = await dbOps.get(STORES.BOOKS, bookId);
            if (book.available <= 0 && !holdId) throw new Error('Book not available');

            // 1. Create Transaction
            await dbOps.add(STORES.TRANSACTIONS, {
                username,
                bookId,
                issueDate: new Date().toISOString(),
                dueDate: new Date(returnDate).toISOString(),
                status: 'issued'
            });

            // 2. Update Book Availability
            book.available--;
            book.issued++;
            await dbOps.put(STORES.BOOKS, book);

            // 3. Clear Hold if it exists
            if (holdId) {
                const hold = await dbOps.get(STORES.HOLDS, parseInt(holdId));
                if (hold) {
                    hold.status = 'fulfilled';
                    await dbOps.put(STORES.HOLDS, hold);
                }
            }

            utils.showToast('Book issued successfully', 'success');
            return true;
        } catch (error) {
            utils.showToast(error.message, 'error');
            return false;
        }
    },

    returnBook: async (transactionId) => {
        try {
            const trans = await dbOps.get(STORES.TRANSACTIONS, transactionId);
            if (trans.status === 'returned') throw new Error('Already returned');

            // 1. Calculate and update Fine if any
            const fineAmt = utils.calculateFine(trans.dueDate);
            if (fineAmt > 0) {
                await dbOps.add(STORES.FINES, {
                    username: trans.username,
                    transactionId,
                    amount: fineAmt,
                    status: 'pending',
                    date: new Date().toISOString()
                });
            }

            // 2. Update Transaction
            trans.status = 'returned';
            trans.returnDate = new Date().toISOString();
            await dbOps.put(STORES.TRANSACTIONS, trans);

            // 3. Update Book
            const book = await dbOps.get(STORES.BOOKS, trans.bookId);
            book.available++;
            book.issued = Math.max(0, book.issued - 1);
            await dbOps.put(STORES.BOOKS, book);

            utils.showToast('Book returned successfully', 'success');
            return true;
        } catch (error) {
            utils.showToast(error.message, 'error');
            return false;
        }
    },

    getActiveLoans: async () => {
        const all = await dbOps.getAll(STORES.TRANSACTIONS);
        return all.filter(t => t.status === 'issued');
    },

    getUserTransactions: async (username) => {
        return await dbOps.getByIndex(STORES.TRANSACTIONS, 'username', username);
    },

    getUserFines: async (username) => {
        return await dbOps.getByIndex(STORES.FINES, 'username', username);
    }
};
