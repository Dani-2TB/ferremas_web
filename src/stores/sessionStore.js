import { defineStore } from 'pinia';
import { ref } from 'vue';

const apiUrl = `http://localhost:8000/api/auth/`;

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
            console.log("logged in")
        } else {
            console.log("not")
        }
    }

    return { username, token, isLoggedIn, login}
});