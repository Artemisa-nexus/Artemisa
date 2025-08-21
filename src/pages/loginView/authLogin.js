//Login function to authenticate the user

export const auth = {

    get: async (param) => {
        try {
            const response = await fetch(`http://localhost:3000/${param}`);
            if (!response.ok) {
                throw new Error('Error getting data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error in GET request:', error);
            throw error;
        }
    },

    login: async (email, password) => {
        const users = await auth.get(`users?email=${email}`); // Fetch user by email
        if (users.length === 0 || users[0].password !== password) {
            throw new Error('Invalid credentials'); // Throw error for invalid credentials
        }
        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
    },
    
    isAuthenticated: () => {
        return !!localStorage.getItem('user');
    },

};