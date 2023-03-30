class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;

    }
    _customFetch(url, heasders) {
        return fetch(url, heasders).then(res => res.ok ? res.json() : Promise.reject(res.statusText));

    }

    getInitalCards() {
        return this._customFetch(`${this._baseUrl}/cards`, {
            headers: this._headers,

        })

    }
    setUserInfo({ name, about }) {
        return this._customFetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        })
    }

    getUserInformation() {
        return this._customFetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,

        })
    }
    createCard(data) {
        return this._customFetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: "DELETE",
        });
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
                headers: this._headers,
                method: "PUT",
            });
        } else {
            return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
                headers: this._headers,
                method: "DELETE",
            });
        }
    }
    setAvatarImage(url) {
        return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: url,
            })
        })
    }
}

export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
    headers: {
        authorization: "bc512917-6cb4-408b-9fef-08d285de7af3",
        "Content-Type": "application/json"
    }
});