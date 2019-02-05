import Cookies from 'js-cookie';

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

function hasToSendBody(type, data) {
  const toUpperCase = type.toUpperCase();
  const isValidMethod = [HTTP_METHODS.POST, HTTP_METHODS.PUT, HTTP_METHODS.DELETE]
    .includes(toUpperCase);
  return isValidMethod && Boolean(data);
}

export const authToken = {
  get() {
    const token = Cookies.get('AUTH_COOKIE');
    return token;
  },

  set(token) {
    const cookiesOptions = { expires: token.expiresIn };
    const authCookie = Cookies.set('AUTH_COOKIE', token.value, cookiesOptions);
    return authCookie;
  },

  clear() {
    const cookiesOptions = {};
    Cookies.remove('AUTH_COOKIE', cookiesOptions);
  },
};

class AppRequest {
  static buildGetUrl(url, params) {
    const finalUrl = Object.entries(params).reduce(
      (result, [key, value]) => (value ? `${result.concat(key)}=${value}&` : result), `${url}?`,
    );
    return finalUrl.substring(0, finalUrl.length - 1);
  }

  static getAuthHeader() {
    return `Bearer ${authToken.get()}`;
  }

  static checkInvalidToken(response) {
    if (response.status === 401) {
      AppRequest.handleLogout();
    }
    return response;
  }

  static handleLogout() {
    authToken.clear();
    window.location = '/';
    throw new Error({ message: 'Token expired' });
  }

  constructor(url = '') {
    this.url = url;
    this.doRequest = this.doRequest.bind(this);
    this.doGet = this.doGet.bind(this);
    this.doPost = this.doPost.bind(this);
  }

  doRequest({
    type, url, data, needAuth = false,
  }) {
    const body = hasToSendBody(type, data) ? JSON.stringify(data) : null;
    const headers = {
      'Content-Type': 'application/json',
    };
    if (needAuth) {
      headers.Authorization = AppRequest.getAuthHeader();
    }
    const requestConfig = {
      method: type,
      headers,
      body,
      credentials: 'same-origin',
    };

    return fetch(this.url.concat(url), requestConfig)
      .then(AppRequest.checkInvalidToken);
  }

  doGet({ url, data = {}, needAuth }) {
    return this.doRequest({
      type: HTTP_METHODS.GET,
      url: Object.keys(data).length > 0 ? AppRequest.buildGetUrl(url, data) : url,
      needAuth,
    });
  }

  doPost({ url, data, needAuth }) {
    return this.doRequest({
      type: HTTP_METHODS.POST,
      url,
      data,
      needAuth,
    });
  }
}

export default AppRequest;
