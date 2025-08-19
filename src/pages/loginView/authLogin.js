

const apiLogin = {
    URL: 'http://localhost:3000/',

    get: async param => {
        try {
            const response = await fetch(`${api.URL}${param}`);
            if (!response.ok) {
                throw new Error('Error getting data');
            }
            return await response.json();
        }catch (error) {
            console.error('Error in GET request:', error);
            throw error;
        };
    }
};

export const auth = {

    //Función Login para autenticar al usuario.
    login: async (email, password) => {
        const users = await apiLogin.get(`users?email=${email}`);//Se realiza la petición para buscar al usuario por email.
        if (users.length === 0 || users[0].password !== password) {
            throw new Error('Datos inválidos'); //Si las crendenciales son inválidas, lanza error.
        }
        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user)); //Guarda al usuario en localStorage.
    }
};