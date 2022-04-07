import { BASE_URL } from '../constants/constants';

export async function login(data) {
  const res = await fetch(`${BASE_URL}/login_check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}
