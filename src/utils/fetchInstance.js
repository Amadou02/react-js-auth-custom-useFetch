import jwt_decode from 'jwt-decoder';

import dayjs from 'dayjs';

let refreshToken = async (authTokens) => {
  let response = await fetch(`${BASE_URL}/token/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `refresh=${authTokens.refresh}`,
  });

  let data = await response.json();
  localStorage.setItem('authToken', JSON.stringify(data));
  return data;
};

// La requête original
let originalRequest = async (url, config) => {
  let response = await fetch(url, config);
  let data = await response.json();
  return { response, data };
};

let fetchInstance = async (url, config = {}) => {
  // On récupère le token s'il existe
  let authTokens = localStorage.getItem('authTokens') || null;
  // On récupère les infos de l'utilisateur du token
  const user = jwt_decode(authTokens.access_token);

  // On vérifie l'expiration du token
  // Calcul la diff entre timestamp de la date d'expiration et le timestamp courant
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (isExpired) {
    // token expiré
    authTokens = await refreshToken(authTokens);
  }

  //   traitement de la requête

  config['headers'] = {
    Authorization: `Bearer ${authTokens?.access_token}`,
  };

  let { response, data } = await originalRequest(url, config);

  return { response, data };
};

export default fetchInstance;
