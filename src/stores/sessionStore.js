import { defineStore } from 'pinia';
import { ref } from 'vue';

const apiUrl = `${import.meta.env.VITE_API_URL}/auth/`;

export const sessionStore = defineStore('session', () => {
    const username = ref('Anonymous');
    const token = ref('Anonymous');
    const isLoggedIn = ref(false);
    const rol = ref("Guest")
    const currency = ref("CLP");

    async function login(user, password) {
        let url = apiUrl + 'login';
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: user, password: password})
        })

        if (response.ok) {
            isLoggedIn.value = true;
            let data = await response.json();
            username.value = data.user;
            token.value = data.token;
            rol.value = data.rol;
            
            localStorage.setItem("ferremas-username", username.value)
            localStorage.setItem("ferremas-token", token.value)
            localStorage.setItem("ferremas-rol", rol.value)
            return {sucess: true}
        } else {
            return await response.json();
        }
    }

    async function register(user, password, email) {
        let url = apiUrl + 'register';
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: user, password: password, email: email})
        });
        if (response.ok) {
            return 'sucess';
        } else {
            return await response.json();
        }
    }

    function logout() {
        username.value = "guest"
        token.value = "guest"
        isLoggedIn.value = false;
        rol.value = "guest";
        localStorage.clear();
    }

    async function checkCredentials() {
        const storedToken = localStorage.getItem("ferremas-token");
        if (storedToken !== null) {
            const url = apiUrl + 'testToken';
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Token ' + storedToken
                }
            });

            if (response.ok) {
                username.value = localStorage.getItem("ferremas-username").valueOf();
                token.value = storedToken;
                rol.value = localStorage.getItem("ferremas-rol").valueOf();
                isLoggedIn.value = true;
            }
        } else {
            return;
        }
    }

    return { username, token, isLoggedIn, rol, currency, login, register, logout, checkCredentials}
});