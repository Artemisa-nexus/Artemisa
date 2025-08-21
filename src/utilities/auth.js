

export const auth = {
    api: {
        URL: 'http://localhost:3000/',

        get: async param => {
            try {
                const response = await fetch(`${auth.api.URL}${param}`);
                if (!response.ok) {
                    throw new Error('Error getting data');
                }
                return await response.json();
            }catch (error) {
                console.error('Error in GET request:', error);
                throw error;
            }
        },

    },

    login: async (email, password) => {
        const users = await auth.api.get(`/users?email=${email}`);//The request is made to search for the user by email.
        if (users.length === 0 || users[0].password !== password) {
            throw new Error('Datos inválidos'); //If the credentials are invalid, it throws an error.
        }
        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user)); //Save the user in localStorage.
    },

    //Logout function to delete user data in localstorage.
    logout: () => {
        localStorage.removeItem('user');
    },

    //isAuthenticated function to confirm that the user is authenticated.
    isAuthenticated: () => {
        return !!localStorage.getItem('user');
    },
}
