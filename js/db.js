const DB_NAME = 'BookWorldDB';
const DB_VERSION = 2;

const STORES = {
    USERS: 'Users',
    BOOKS: 'Books',
    TRANSACTIONS: 'Transactions',
    FINES: 'Fines',
    HOLDS: 'Holds',
    WISHLIST: 'Wishlist'
};

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => reject('Database error: ' + event.target.errorCode);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Users Store
            if (!db.objectStoreNames.contains(STORES.USERS)) {
                const userStore = db.createObjectStore(STORES.USERS, { keyPath: 'username' });
                userStore.createIndex('role', 'role', { unique: false });
            }

            // Books Store
            if (!db.objectStoreNames.contains(STORES.BOOKS)) {
                const bookStore = db.createObjectStore(STORES.BOOKS, { keyPath: 'id', autoIncrement: true });
                bookStore.createIndex('title', 'title', { unique: false });
                bookStore.createIndex('author', 'author', { unique: false });
                bookStore.createIndex('department', 'department', { unique: false });
            }

            // Transactions Store
            if (!db.objectStoreNames.contains(STORES.TRANSACTIONS)) {
                const transStore = db.createObjectStore(STORES.TRANSACTIONS, { keyPath: 'id', autoIncrement: true });
                transStore.createIndex('username', 'username', { unique: false });
                transStore.createIndex('bookId', 'bookId', { unique: false });
                transStore.createIndex('status', 'status', { unique: false }); // issued, returned
            }

            // Fines Store
            if (!db.objectStoreNames.contains(STORES.FINES)) {
                const fineStore = db.createObjectStore(STORES.FINES, { keyPath: 'id', autoIncrement: true });
                fineStore.createIndex('username', 'username', { unique: false });
                fineStore.createIndex('status', 'status', { unique: false }); // pending, paid
            }

            // Holds Store
            if (!db.objectStoreNames.contains(STORES.HOLDS)) {
                const holdStore = db.createObjectStore(STORES.HOLDS, { keyPath: 'id', autoIncrement: true });
                holdStore.createIndex('bookId', 'bookId', { unique: false });
                holdStore.createIndex('username', 'username', { unique: false });
                holdStore.createIndex('status', 'status', { unique: false }); // pending, fulfilled, cancelled
            }

            // Wishlist Store
            if (!db.objectStoreNames.contains(STORES.WISHLIST)) {
                const wishStore = db.createObjectStore(STORES.WISHLIST, { keyPath: 'id', autoIncrement: true });
                wishStore.createIndex('bookId', 'bookId', { unique: false });
                wishStore.createIndex('username', 'username', { unique: false });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
    });
}

async function performTransaction(storeName, mode, callback) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, mode);
        const store = tx.objectStore(storeName);
        const request = callback(store);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Helper methods
const dbOps = {
    add: (storeName, data) => performTransaction(storeName, 'readwrite', (store) => store.add(data)),
    put: (storeName, data) => performTransaction(storeName, 'readwrite', (store) => store.put(data)),
    get: (storeName, key) => performTransaction(storeName, 'readonly', (store) => store.get(key)),
    getAll: (storeName) => performTransaction(storeName, 'readonly', (store) => store.getAll()),
    delete: (storeName, key) => performTransaction(storeName, 'readwrite', (store) => store.delete(key)),
    getByIndex: async (storeName, indexName, value) => {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const index = store.index(indexName);
            const request = index.getAll(value);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
};
