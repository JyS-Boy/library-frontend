export const API_ROUTES = {
    AUTH: {
        LOGIN: '/api/auth/login'
    },

    USERS: {
        BASE: '/api/users',
        BY_ID: (id: string) => `/api/users/${id}`
    },

    AUTHORS: {
        BASE: '/api/authors',
        BY_ID: (id: string) => `/api/authors/${id}`
    },

    CATEGORIES: {
        BASE: '/api/categories',
        BY_ID: (id: string) => `/api/categories/${id}`
    },

    BOOKS: {
        BASE: '/api/books',
        BY_ID: (id: string) => `/api/books/${id}`
    },

    READERS: {
        BASE: '/api/readers',
        BY_ID: (id: string) => `/api/readers/${id}`
    },

    LOANS: {
        BASE: '/api/loans',
        BY_ID: (id: string) => `/api/loans/${id}`,
        RETURN: (id: string) => `/api/loans/${id}/return`
    }
};