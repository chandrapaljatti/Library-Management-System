// Supabase configuration - REPLACE WITH YOUR CREDENTIALS
const SUPABASE_URL = 'https://fxserxvrguavcrhnnhnn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4c2VyeHZyZ3VhdmNyaG5uaG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NDcxNTEsImV4cCI6MjA4ODAyMzE1MX0.Mu3CuN7kcVgOmg4e49lzF03GhbOvHEaji67w3kfq7yA';

// Initialize Supabase Client
console.log('Initializing Supabase with URL:', SUPABASE_URL);

// Connection check handled during first data fetch

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const STORES = {
    USERS: 'Users',
    BOOKS: 'Books',
    TRANSACTIONS: 'Transactions',
    FINES: 'Fines',
    HOLDS: 'Holds',
    WISHLIST: 'Wishlist'
};

// Database operations
const dbOps = {
    add: async (storeName, data) => {
        const { data: result, error } = await supabaseClient
            .from(storeName)
            .insert([data])
            .select();
        if (error) {
            console.error(`Error adding to ${storeName}:`, error);
            throw error;
        }
        return result[0];
    },
    put: async (storeName, data) => {
        const { data: result, error } = await supabaseClient
            .from(storeName)
            .upsert([data])
            .select();
        if (error) {
            console.error(`Error updating in ${storeName}:`, error);
            throw error;
        }
        return result[0];
    },
    get: async (storeName, key) => {
        const keyField = storeName === STORES.USERS ? 'username' : 'id';
        const { data, error } = await supabaseClient
            .from(storeName)
            .select('*')
            .eq(keyField, key)
            .maybeSingle();

        if (error) {
            console.error(`Error getting from ${storeName}:`, error);
            throw error;
        }
        return data;
    },
    getAll: async (storeName) => {
        const { data, error } = await supabaseClient
            .from(storeName)
            .select('*');
        if (error) {
            console.error(`Error getting all from ${storeName}:`, error);
            throw error;
        }
        return data;
    },
    delete: async (storeName, key) => {
        const keyField = storeName === STORES.USERS ? 'username' : 'id';
        const { error } = await supabaseClient
            .from(storeName)
            .delete()
            .eq(keyField, key);
        if (error) {
            console.error(`Error deleting from ${storeName}:`, error);
            throw error;
        }
    },
    getByIndex: async (storeName, indexName, value) => {
        const { data, error } = await supabaseClient
            .from(storeName)
            .select('*')
            .eq(indexName, value);
        if (error) {
            console.error(`Error getting from ${storeName} by index ${indexName}:`, error);
            throw error;
        }
        return data;
    }
};

// Placeholder for initialization - not strictly needed for Supabase but kept for compatibility
function initDB() {
    return Promise.resolve(supabaseClient);
}
