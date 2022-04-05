import { BASE_URL } from '../constants/constants';

export async function findTodos(token) {
  const res = await fetch(`${BASE_URL}/todos`, {
    headers: {
      'Content-Type': 'application/json',
    //   Autorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function findOneTodo(token) {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: {
      'Content-Type': 'application/json',
      Autorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
export async function updateTodo(data, token, id) {
  const res = await fetch(`${BASE_URL}/todos/?id=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Autorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function createTodo(data, token) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Autorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
