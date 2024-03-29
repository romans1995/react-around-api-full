class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this.token = localStorage.getItem("token");
        this._headers = headers;

    }
    _customFetch(url, headers) {
        return fetch(url, headers).then(res => res.ok ? res.json() : Promise.reject(res.statusText));

    }

    getInitalCards(token) {
        return this._customFetch(`${this._baseUrl}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify()
        })

    }
    setUserInfo({ name, about }) {
        return this._customFetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            method: "PATCH",
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        })
    }

    getUserInformation(token) {
        return this._customFetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
    }
    createCard(data, token) {
        return this._customFetch(`${this._baseUrl}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            method: "DELETE",
        });
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            return this._customFetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'PUT',
                    Authorization: `Bearer ${this.token}`
                },
                method: "PUT",
            });
        } else {
            return this._customFetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`
                },
                method: "DELETE",
            });
        }
    }
    setAvatarImage(url, token) {
        return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'PATCH',
            body: JSON.stringify({
                avatar: url,
            })
        })
    }
}

export const api = new Api({
    // baseUrl: "https://api.around-r.chickenkiller.com",
    baseUrl: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
});