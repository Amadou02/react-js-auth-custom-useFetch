import { BASE_URL } from '../constants/constants';

export async function login(data) {
  const res = await fetch(`${BASE_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function me(token) {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: {
      'Content-Type': 'application/json',
      Autorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
export async function findOneUser(id, token) {
  const res = await fetch(`${BASE_URL}/user/?id=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Autorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: id }),
  });
  return res.json();
}
