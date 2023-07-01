const BASE_URL = "https://api.fillrkd.nomoreparties.sbs";

const checkError = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

export const signUp = async (data) => {
    const res = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return checkError(res);
}

export const signIn = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(checkError)
    .then((data) => {
        localStorage.setItem('jwt', data.token);
        return data;
    })
};

export const checkAuthData = async() => {
    const token = localStorage.getItem('jwt');
    const res = await fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return checkError(res);
}