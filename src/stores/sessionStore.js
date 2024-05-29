import { defineStore } from 'pinia';
import { ref } from 'vue';

const apiUrl = `${import.meta.env.VITE_API_URL}/auth/`;

export const sessionStore = defineStore('session', () => {
    const username = ref('Anonymous');
    const token = ref('Anonymous');
    const isLoggedIn = ref(false);

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
        } else {
            return
        }

        let data = await response.json()

        username.value = data.user;
        token.value = data.token;

        console.log(this.username)
        console.log(this.token)
    }

    function logout() {
        username.value = "Anonymous"
        token.value = "Anonymous"
        isLoggedIn.value = false;
    }

    return { username, token, isLoggedIn, login, logout}
});