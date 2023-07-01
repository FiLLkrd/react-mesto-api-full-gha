class API {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getUserInfo() {
    const token = localStorage.getItem('jwt');
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return this._checkError(res);
  }

  async getCards() {
    const token = localStorage.getItem('jwt');
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return this._checkError(res);
  }

  async editProfile(data) {
    const token = localStorage.getItem('jwt');
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._checkError(res);
  }

  async addNewCard(name, link) {
    const token = localStorage.getItem('jwt');
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    return this._checkError(res);
  }

  async deleteCard(id) {
    const token = localStorage.getItem('jwt');
    const res = await fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`
      },
    });
    return this._checkError(res);
  }

  async editAvatar(link) {
    const token = localStorage.getItem('jwt');
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: link,
      }),
    });
    return this._checkError(res);
  }

  async changeLikeCard(cardId, liked) {
    const token = localStorage.getItem('jwt');
    if (liked) {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`
        },
      });
      return this._checkError(res);
    } else {
      const res_2 = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`
        },
      });
      return this._checkError(res_2);
    }
  }
}

const apiRequest = new API({
  baseUrl: "https://api.fillrkd.nomoreparties.sbs",
});

export default apiRequest;
