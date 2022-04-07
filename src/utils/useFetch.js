import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { BASE_URL } from '../constants/constants';

let useFetch = () => {
  let config = {};

  let authTokens = JSON.parse(localStorage.getItem('authTokens')) || null;
  console.log(authTokens);
  // La requête original
  let originalRequest = async (url, config) => {
    let response = await fetch(url, config);
    let data = await response.json();
    return { response, data };
  };
  // refresh call
  let refreshToken = async (authTokens) => {
    let response = await fetch(`${BASE_URL}/token/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `refresh=${authTokens.refresh_token}`,
    });

    let data = await response.json();
    localStorage.setItem('authTokens', JSON.stringify(data));
    return data;
  };

  /**
   *
   * @param {string} url
   * @param {string} method
   * @param {Object} postData
   * @returns Object
   */
  let callFetch = async (url, method = 'GET', postData = null) => {
    // On récupère les infos de l'utilisateur du token
    const user = jwt_decode(authTokens?.token);

    // On vérifie l'expiration du token
    // Calcul la diff entre timestamp de la date d'expiration et le timestamp courant
    const isExpired = user ? dayjs.unix(user.exp).diff(dayjs()) < 1 : false;

    if (isExpired) {
      // token expiré
      authTokens = await refreshToken(authTokens);
    }

    //   traitement de la requête

    config['headers'] = {
      Authorization: `Bearer ${authTokens?.token}`,
    };

    config['method'] = method;

    if (postData) {
      config['body'] = JSON.stringify(postData);
    }

    let { response, data } = await originalRequest(url, config);

    if (!response.ok) {
      return Promise.reject(response);
    }
    return { response, data };
  };

  return callFetch;
};

export default useFetch;
