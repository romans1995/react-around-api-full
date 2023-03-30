const BASE_URL = "https://register.nomoreparties.co";
const customFetch = (url, heasders) => {
    return fetch(url, heasders).then(res => res.ok ? res.json() : Promise.reject(res.statusText));
}

export const signUp = (email, password) => {
    return customFetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
};

export const signIn = (email, password) => {
    return customFetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
};

export const checkTocken = (token) => {
    return customFetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
};