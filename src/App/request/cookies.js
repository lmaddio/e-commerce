import Cookies from 'js-cookie';

const authToken = {
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

export default authToken;
