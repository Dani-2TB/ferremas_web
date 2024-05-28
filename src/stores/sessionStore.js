import { defineStore } from 'pinia';
import { ref } from 'vue';

const apiUrl = `${import.meta.env.VITE_API_URL}/auth/`;

export const sessionStore = defineStore('session', () => {
    const username = ref('Anonymous');
    const token = ref('Anonymous');
    const isLoggedIn = ref(false);

    async function login(username, password) {
        let url = apiUrl + 'login';
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        })

        if (response.ok) {
            this.isLoggedIn = true;
        } else {
            return
        }

        let data = await response.json()

        this.username = data.user;
        this.token = data.token;

        console.log(this.username)
        console.log(this.token)
    }

    function logout() {
        this.username = "Anonymous"
        this.token = "Anonymous"
        this.isLoggedIn = false;
    }

    return { username, token, isLoggedIn, login, logout}
});